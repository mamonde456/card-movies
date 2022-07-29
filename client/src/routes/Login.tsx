import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, loggedInUser } from "../atom";

interface ILogin {
  username: string;
  password: number;
}

const Login = () => {
  const [user, setUser] = useState<ILogin>({
    username: "",
    password: 0,
  });
  const [isLogin, setIsLogin] = useRecoilState(loggedInState);

  let navigate = useNavigate();

  // login userInfo post
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/users/login", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
        } else if (data.loggedInUser.username === user.username) {
          sessionStorage.setItem("loggedIn", data.loggedIn);
          sessionStorage.setItem("user", JSON.stringify(data.loggedInUser));
          setIsLogin(true);
        }
      });
    navigate("/");
  };
  const onChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <h1>login</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="username"
          name="username"
          onChange={onChange}
          required
        ></input>
        <input
          placeholder="password"
          name="password"
          onChange={onChange}
          required
        ></input>
        <button>log in</button>
      </form>
    </>
  );
};

export default Login;
