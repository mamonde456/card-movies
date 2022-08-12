import { response } from "express";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInUser } from "../atom";

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url("http://localhost:5000/${(props) => props.bgPhoto}");
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 100px;
`;

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState(loggedInUser) as any;
  const data = JSON.parse(sessionStorage.getItem("user") as any);
  useEffect(() => {
    setUser(data);
  }, []);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const {
      target: { avatar, username, name, email, location, info },
    } = event;
    const formData = new FormData();
    formData.append("userId", userId || "");
    formData.append("avatar", avatar.files[0]);
    formData.append("username", username.value);
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("location", location.value);
    formData.append("info", info.value);
    const response = await fetch(
      "http://localhost:5000/api/users/edit-profile",
      {
        method: "post",
        body: formData,
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      sessionStorage.setItem("user", JSON.stringify(data));
    }
  };

  return (
    <>
      <div>
        <Image bgPhoto={user.avatarUrl}></Image>
        <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
          <label key={"avatar"}>
            {" "}
            upload file
            <input id="avatar" name="avatar" type="file" accept="image/*" />
          </label>
          <input
            placeholder="username"
            type="text"
            name="username"
            defaultValue={user.username}
          />
          <input
            placeholder="name"
            type="text"
            name="name"
            defaultValue={user.name}
          />
          <input
            placeholder="email"
            type="email"
            name="email"
            defaultValue={user.email}
          />
          <input placeholder="location" type="text" name="location" />
          <textarea placeholder="Introduce me." name="info" />
          <button>save</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
