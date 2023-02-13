import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ShowTodo from "../components/ShowTodo";

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
          setTodoList([...todoList, response.data]);
          setInputTodo("");
        }
      });
  };

  const deleteTodo = (id) => {
    console.log("삭제", id);
    axios
      .delete(`${baseUrl}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          console.log("삭제된아이디", id);
          setTodoList(
            todoList.filter((todo) => {
              return todo.id !== id;
            })
          );
        }
      });
  };

  const renderTodoList = todoList.length
    ? todoList.map((todo) => {
        return <ShowTodo todo={todo} deleteTodo={deleteTodo} key={todo.id} />;
      })
    : "Todo가 없습니다.";

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
      <div style={{ padding: "20px" }}>{renderTodoList}</div>
    </>
  );
};

export default TodoList;
