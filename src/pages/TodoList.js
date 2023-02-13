import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      axios
        .get(`${baseUrl}/todos`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <div>투두리스트</div>
    </>
  );
};

export default TodoList;
