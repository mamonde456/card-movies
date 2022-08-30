import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div``;

const FormWrap = styled.div`
  padding-top: 150px;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 100px;
`;
const Form = styled.form`
  width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  background: none;
  border: none;
  padding: 10px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  color: white;
`;

const Btn = styled.button`
  margin-top: 30px;
  width: 100%;
  height: 50px;
  background: none;
  border: solid 1px rgba(255, 255, 255, 0.5);
  color: white;
  background-color: #395b64;
  border-radius: 10px;
`;

const ChangePassword = () => {
  const { userId } = useParams();
  const navigator = useNavigate();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      currentTarget: { oldPassword, newPassword, confirmPassword },
    } = event;
    console.log(oldPassword.value, newPassword.value, confirmPassword.value);

    const response = await fetch("http://localhost:5000/api/change-password", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      }),
    });
    if (response.status === 200) {
      navigator(`/users/${userId}/edit-profile`);
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data);
      navigator(`/users/${userId}/edit-profile`);
    }
  };
  return (
    <Wrapper>
      <Header></Header>
      <FormWrap>
        <PageTitle>Change Password</PageTitle>
        <Form onSubmit={onSubmit}>
          <Input
            name="oldPassword"
            placeholder="Existing Password"
            type="password"
          ></Input>
          <Input
            name="newPassword"
            placeholder="A New Password"
            type="password"
          ></Input>
          <Input
            name="confirmPassword"
            placeholder="Confirm New Password"
            type="password"
          ></Input>
          <Btn>Change Password</Btn>
        </Form>
      </FormWrap>
    </Wrapper>
  );
};

export default ChangePassword;
