import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [formValidate, setFormValidate] = useState(false);

  useEffect(() => {
    const isEmailValidate = userEmail.includes("@");
    const isPwValidate = userPw.length >= 8 ? true : false;

    if (isEmailValidate && isPwValidate) {
      setFormValidate(true);
    } else {
      setFormValidate(false);
    }
  }, [userEmail, userPw]);

  const postFormData = () => {
    axios
      .post(
        `${baseUrl}/auth/signin`,
        {
          email: userEmail,
          password: userPw,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          localStorage.setItem("authToken", response.data.access_token);
          navigate("/todo");
        }
      })
      .catch((error) => {
        const status = error.response.status;
        switch (status) {
          case 404:
            alert("이메일이 존재하지 않습니다.");
            break;
          case 401:
            alert("비밀번호가 틀렸습니다.");
            break;
          default:
            alert("알수없는 오류가 발생했습니다.");
            break;
        }
      });
  };

  return (
    <>
      <h1>로그인</h1>
      <div>
        <input
          type="text"
          data-testid="email-input"
          placeholder="이메일을 입력해주세요"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
          placeholder="비밀번호를 입력해주세요"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        />
        <br />
        <button data-testid="signup-button" disabled={!formValidate} onClick={postFormData}>
          로그인
        </button>
      </div>
    </>
  );
};

export default SignIn;
