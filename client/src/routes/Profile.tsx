import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atom";

const Profile = () => {
  const [user, setUser] = useRecoilState(loggedInUser) as any;

  const data = JSON.parse(sessionStorage.getItem("user") as any);
  useEffect(() => {
    setUser(data);
  }, []);

  return (
    <>
      <div>
        <form>
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
          <button>save</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
