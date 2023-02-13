import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      axios
        .get(`${baseUrl}/todos`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setTodoList(response.data);
        });
    } else {
      navigate("/signin");
    }
  }, [baseUrl, authToken, navigate]);

  const [todoList, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState("");

  const getTodos = () => {
    axios
      .get(`${baseUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTodoList(response.data);
        }
      });
  };

  const createTodo = () => {
    axios
      .post(
        `${baseUrl}/todos`,
        { todo: inputTodo },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          getTodos();
        }
      });
  };

  const updateTodo = (id, value) => {
    const thisTodo = todoList.filter((todo) => {
      return todo.id === id;
    });

    axios
      .put(
        `${baseUrl}/todos/${id}`,
        {
          todo: thisTodo[0].todo,
          isCompleted: value,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          getTodos();
        }
      });
  };

  return (
    <>
      <h1>투두리스트</h1>
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          data-testid="new-todo-input"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button data-testid="new-todo-add-button" onClick={createTodo}>
          추가
        </button>
      </div>
      <div style={{ padding: "20px" }}>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="checkbox" value={todo.isCompleted} onChange={(e) => updateTodo(todo.id, e.target.checked)} />
              {todo.todo}
              <button>수정</button>
              <button>삭제</button>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
