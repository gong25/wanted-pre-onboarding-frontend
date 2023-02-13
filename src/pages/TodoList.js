import axios from "axios";
import { useEffect } from "react";

const TodoList = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios.get(`${baseUrl}/todos`).then((response) => {
      console.log(response);
    }, []);
  });

  return (
    <>
      <div>투두리스트</div>
    </>
  );
};

export default TodoList;
