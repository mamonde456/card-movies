import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
  width: 100%;
  min-height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
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

const Hr = styled.hr`
  background: rgba(0, 0, 0, 0.3);
  height: 2px;
  border: 0px;
  margin-bottom: 20px;
`;
interface IUser {
  username: string;
  name: string;
  email: string;
  password: number;
  password2: number;
  location: string;
}

const Join = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    name: "",
    email: "",
    password: 0,
    password2: 0,
    location: "",
  });
  let navigate = useNavigate();
  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/join", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    if (response.status === 200) {
      navigate("/login");
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data.errorMessage);
    }
  };

  return (
    <Wrapper>
      <Header></Header>
      <Form onSubmit={onSubmit}>
        <Title>Sign up</Title>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="username"
            key="username"
            name="username"
            onChange={onChange}
          />
        </Box>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M351.8 367.3v-44.1C328.5 310.7 302.4 304 274.7 304H173.3c-95.73 0-173.3 77.65-173.3 173.4C.0005 496.5 15.52 512 34.66 512h378.7c11.86 0 21.82-6.337 28.07-15.43l-61.65-61.57C361.7 416.9 351.8 392.9 351.8 367.3zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM630.6 364.8L540.3 274.8C528.3 262.8 512 256 495 256h-79.23c-17.75 0-31.99 14.25-31.99 32l.0147 79.2c0 17 6.647 33.15 18.65 45.15l90.31 90.27c12.5 12.5 32.74 12.5 45.24 0l92.49-92.5C643.1 397.6 643.1 377.3 630.6 364.8zM447.8 343.9c-13.25 0-24-10.62-24-24c0-13.25 10.75-24 24-24c13.38 0 24 10.75 24 24S461.1 343.9 447.8 343.9z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="name"
            key="name"
            name="name"
            onChange={onChange}
          />
        </Box>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="email"
            key="email"
            name="email"
            onChange={onChange}
          />
        </Box>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M592 288H576V212.7c0-41.84-30.03-80.04-71.66-84.27C456.5 123.6 416 161.1 416 208V288h-16C373.6 288 352 309.6 352 336v128c0 26.4 21.6 48 48 48h192c26.4 0 48-21.6 48-48v-128C640 309.6 618.4 288 592 288zM496 432c-17.62 0-32-14.38-32-32s14.38-32 32-32s32 14.38 32 32S513.6 432 496 432zM528 288h-64V208c0-17.62 14.38-32 32-32s32 14.38 32 32V288zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM320 336c0-8.672 1.738-16.87 4.303-24.7C308.6 306.6 291.9 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h301.7C326.3 498.6 320 482.1 320 464V336z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="password"
            key="password"
            name="password"
            onChange={onChange}
          />
        </Box>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M592 288H576V212.7c0-41.84-30.03-80.04-71.66-84.27C456.5 123.6 416 161.1 416 208V288h-16C373.6 288 352 309.6 352 336v128c0 26.4 21.6 48 48 48h192c26.4 0 48-21.6 48-48v-128C640 309.6 618.4 288 592 288zM496 432c-17.62 0-32-14.38-32-32s14.38-32 32-32s32 14.38 32 32S513.6 432 496 432zM528 288h-64V208c0-17.62 14.38-32 32-32s32 14.38 32 32V288zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM320 336c0-8.672 1.738-16.87 4.303-24.7C308.6 306.6 291.9 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h301.7C326.3 498.6 320 482.1 320 464V336z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="confirm password"
            key="password2"
            name="password2"
            onChange={onChange}
          />
        </Box>
        <Box>
          <IconBox>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
            </Icon>
          </IconBox>
          <Input
            placeholder="location"
            key="location"
            name="location"
            onChange={onChange}
          />
        </Box>
        <Hr />
        <Button>send</Button>
      </Form>
      {/* <div></div> */}
    </Wrapper>
  );
};

export default Join;
