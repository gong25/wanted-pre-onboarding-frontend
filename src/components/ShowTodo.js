import { useEffect, useState } from "react";

import axios from "axios";

const ShowTodo = (props) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const authToken = localStorage.getItem("authToken");

  const [todo, setTodo] = useState(props.todo.todo);
  const [tempTodo, setTempTodo] = useState(props.todo.todo);
  const [isCompleted, setIsCompleted] = useState(props.todo.isCompleted);
  const [isUpdate, setIsUpdate] = useState(false);

  const updateTodo = () => {
    axios
      .put(
        `${baseUrl}/todos/${props.todo.id}`,
        {
          todo: tempTodo,
          isCompleted: isCompleted,
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
          setTodo(response.data.todo);
          setIsUpdate(false);
        }
      });
  };

  useEffect(() => {
    updateTodo();
  }, [isCompleted]);

  const renderTodo = isUpdate ? (
    <input data-testid="modify-input" value={tempTodo} onChange={(e) => setTempTodo(e.target.value)} />
  ) : (
    todo
  );
  const renderUpdateButton = isUpdate ? (
    <button data-testid="submit-button" onClick={updateTodo}>
      제출
    </button>
  ) : (
    <button data-testid="modify-button" onClick={() => setIsUpdate(true)}>
      수정
    </button>
  );

  const renderDeleteButton = isUpdate ? (
    <button data-testid="cancel-button" onClick={() => [setIsUpdate(false), setTempTodo(todo)]}>
      취소
    </button>
  ) : (
    <button data-testid="delete-button" onClick={() => props.deleteTodo(props.todo.id)}>
      삭제
    </button>
  );

  const activeCss = {
    textDecoration: "line-through ",
    color: "grey",
  };

  return (
    <li key={props.todo.id}>
      <input type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
      <span style={isCompleted ? activeCss : undefined}>{renderTodo}</span>
      {renderUpdateButton}
      {renderDeleteButton}
    </li>
  );
};

export default ShowTodo;
