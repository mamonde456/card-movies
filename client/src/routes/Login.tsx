import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInState, loggedInUser } from "../atom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  padding: 10px;
  text-align: center;
  // margin-bottom: 40px;
  font-size: 42px;
  color: white;
  // background-color: red;
`;
const Form = styled.form`
  width: 500px;
  padding: 20px 30px;
  background-color: rgba(16, 15, 15, 0.5);
  border-radius: 10px;
  box-shadow: 2px 5px 10px black;
`;
const Box = styled.div`
  width: 100%;
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  text-indent: 60px;
  border-radius: 30px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  color: white;
  &::placeholder {
    color: white;
  }
  position: relative;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  border: none;
  background-color: #0f3d3e;
  margin-bottom: 30px;
  color: white;
  font-size: 18px;
`;
const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 1;
`;
const Icon = styled.svg`
  padding: 10px;
  font-size: 18px;
`;

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
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      sessionStorage.setItem("loggedIn", data.loggedIn);
      sessionStorage.setItem("user", JSON.stringify(data.loggedInUser));
      setIsLogin(true);
      navigate("/");
    } else if (response.status === 400) {
      console.log(data.errorMessage);
    }
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
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>Log In</Title>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="username"
            name="username"
            onChange={onChange}
            required
          />
        </Box>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M144 192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80V144C80 64.47 144.5 0 224 0C281.5 0 331 33.69 354.1 82.27C361.7 98.23 354.9 117.3 338.1 124.9C322.1 132.5 303.9 125.7 296.3 109.7C283.4 82.63 255.9 64 224 64C179.8 64 144 99.82 144 144L144 192z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="password"
            name="password"
            onChange={onChange}
            required
          />
        </Box>
        <Button>log in</Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
