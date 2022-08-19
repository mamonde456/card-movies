import { response } from "express";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInUser } from "../atom";

const Wrapper = styled.div`
  padding-top: 90px;
  padding-bottom: 100px;
  color: white;
  h1 {
    padding: 10px 10px 30px 10px;
    text-align: center;
  }
`;

const SectionTitle = styled.h3`
  padding-bottom: 20px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
`;

const UploadForm = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const UploadFileWrapper = styled.div`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 50px;
  position: relative;
`;
const UploadFileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UploadFileBtn = styled.label`
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-itmes: center;
  gap: 10px;
  // background-color: #0f3d3e;
  border: solid 1px white;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.8);
`;

const UploadFile = styled.input`
  width: 68%;
  padding: 10px;
  border-bottom: solid 1px #e2dcc8;
  color: rgba(255, 255, 255, 0.3);
  &::file-selector-button {
    display: none;
  }
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  fill: white;
`;

const TitleLabel = styled.label`
  padding: 10px;
  margin-bottom: 10px;
`;

const UploadInput = styled.input`
  padding: 10px;
  height: 50px;
  outline: none;
  background: none;
  border: none;
  border-bottom: solid 1px rgba(255, 255, 255, 0.8);
  color: white;
  margin-bottom: 10px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const TitleBox = styled.div`
  width: 100%;
  input {
    width: 100%;
  }
`;

const UploadTextArea = styled.textarea`
  outline: none;
  border: none;
  background: none;
  border-bottom: solid 1px rgba(255, 255, 255, 0.8);
  padding: 10px;
  height: 150px;
  resize: none;
  margin-bottom: 20px;
  color: white;
`;

const UploadBtn = styled.button`
  bakcground: none;
  border: none;
  color: white;
  background-color: #395b64;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5);
`;

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url("http://localhost:5000/${(props) => props.bgPhoto}");
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 100px;
  position: absolute;
  left: -150px;
  top: 80px;
  &::before {
    content: "Existing avatar image";
    padding: 10px;
    width: 150px;
    position: absolute;
    top: -50px;
    left: 50%;
    margin-left: -75px;
    opacity: 0.5;
  }
`;

const EditProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState(loggedInUser) as any;
  const data = JSON.parse(sessionStorage.getItem("user") as any);
  let navigator = useNavigate();
  useEffect(() => {
    setUser(data);
  }, []);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event);
    const {
      target: { avatar, username, name, email, location, info },
    } = event;
    const formData = new FormData();
    formData.append("userId", userId ? userId : user._id);
    formData.append("avatar", avatar.files[0]);
    formData.append(
      "username",
      username.value ? username.value : user.username
    );
    formData.append("name", name.value ? name.value : user.name);
    formData.append("email", email.value ? email.value : user.email);
    formData.append(
      "location",
      location.value ? location.value : user.location
    );
    formData.append("info", info.value ? info.value : user.info);
    const response = await fetch(
      `http://localhost:5000/api/users/${userId}/edit-profile`,
      {
        method: "post",
        body: formData,
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      sessionStorage.setItem("user", JSON.stringify(data));
      navigator(`/users/${userId}`);
    } else if (response.status === 400) {
      console.log(data);
    }
  };

  return (
    <Wrapper>
      <div>
        <UploadForm encType="multipart/form-data" onSubmit={onSubmit}>
          <UploadFileWrapper>
            <Image bgPhoto={user.avatarUrl}></Image>
            <SectionTitle>File Uploader</SectionTitle>
            <p>Avatar</p>
            <UploadFileBox>
              <UploadFile
                name="avatar"
                id="avatar"
                type="file"
                accept="image/*"
              />
              <UploadFileBtn htmlFor="avatar">
                search file...
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM288.1 344.1C284.3 349.7 278.2 352 272 352s-12.28-2.344-16.97-7.031L216 305.9V408c0 13.25-10.75 24-24 24s-24-10.75-24-24V305.9l-39.03 39.03c-9.375 9.375-24.56 9.375-33.94 0s-9.375-24.56 0-33.94l80-80c9.375-9.375 24.56-9.375 33.94 0l80 80C298.3 320.4 298.3 335.6 288.1 344.1z" />
                </Icon>
              </UploadFileBtn>
            </UploadFileBox>
          </UploadFileWrapper>
          <SectionTitle>User Information</SectionTitle>
          <TitleWrapper>
            <TitleBox>
              <TitleLabel htmlFor="username">Username</TitleLabel>
              <UploadInput
                placeholder="username"
                type="text"
                name="username"
                id="username"
                defaultValue={user.username}
              />
              <TitleLabel htmlFor="name">Name</TitleLabel>
              <UploadInput
                placeholder="name"
                type="text"
                name="name"
                id="name"
                defaultValue={user.name}
              />
              <TitleLabel htmlFor="email">Email</TitleLabel>
              <UploadInput
                placeholder="email"
                type="email"
                name="email"
                id="email"
                defaultValue={user.email}
              />
              <TitleLabel htmlFor="location">location</TitleLabel>
              <UploadInput
                placeholder="location"
                type="text"
                id="location"
                name="location"
              />
            </TitleBox>
          </TitleWrapper>
          <SectionTitle>Introduction section</SectionTitle>
          <TitleLabel htmlFor="info">Self-introduction column</TitleLabel>
          <UploadTextArea placeholder="Introduce me." id="info" name="info" />
          <UploadBtn>save</UploadBtn>
        </UploadForm>
      </div>
    </Wrapper>
  );
};

export default EditProfile;
