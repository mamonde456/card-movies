import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInState, loggedInUser } from "../atom";

interface ILoginUser {
  username: string;
  name: string;
  email: string;
  _id: string;
  password: string;
}

const LogOut = styled.p``;

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(loggedInState);
  const [isLoginUser, setIsLoginUser] = useState<ILoginUser>(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );
  let navigate = useNavigate();
  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin]);
  const onLogOut = async () => {
    if (isLogin === true) {
      sessionStorage.removeItem("loggedIn");
      setIsLogin(false);
    }

    const data = await (
      await fetch("http://localhost:5000/api/users/logout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loggedIn: false,
        }),
      })
    ).json();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <Link to="/">home</Link>
        <Link to="/upload">upload</Link>
        {isLogin ? (
          <>
            <LogOut onClick={onLogOut}>log out</LogOut>
            <Link to={isLoginUser._id}>{isLoginUser.username} profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">login</Link>
            <Link to="/join">join</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
