import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
        `${baseUrl}/auth/signup`,
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
        if (response.status === 201) {
          navigate("/signin");
        }
      });
  };

  return (
    <>
      <h1>회원가입</h1>
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
          회원가입
        </button>
      </div>
    </>
  );
};

export default SignUp;
