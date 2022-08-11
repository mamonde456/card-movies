import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atom";

const Profile = () => {
  const [user, setUser] = useRecoilState(loggedInUser) as any;

  const data = JSON.parse(sessionStorage.getItem("user") as any);
  useEffect(() => {
    setUser(data);
  }, []);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);
    await uploadFile(formData);

    const {
      target: { username, name, email, location, info },
    } = event(async () => {
      await fetch("http://localhost:5000/api/users/edit-profile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          email,
          location,
          info,
        }),
      });
    })();
  };

  const uploadFile = async (file: any) => {
    await fetch("http://localhost:5000/api/users/edit-profile", {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
  };

  return (
    <>
      <div>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
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
