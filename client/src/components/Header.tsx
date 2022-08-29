import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInState, loggedInUser } from "../atom";

const Menu = styled.header`
  width: 100%;
  height: 100px;
  background: -webkit-linear-gradient(180deg, black 50%, transparent 100%);
  background: linear-gradient(180deg, black 50%, transparent 100%);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  margin-left: 40px;
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavLi = styled.li`
  padding: 10px;
  font-size: 16px;
  font-weight: 700;
  color: white;
`;

const LogOut = styled.p`
  cursor: pointer;
`;

const MenuBar = styled.div`
  width: 45px;
  height: 45px;
  cursor: pointer;
`;
const Icon = styled.svg`
  fill: white;
  padding: 10px;
`;

//movies menu

const MoviesMenu = styled.header`
  height: 100%;
  // position: relative;
  position: absolute;
  top: 0;
`;

interface IProps {
  link?: string;
}

const Header = ({ link }: IProps) => {
  const ok = window.location.href.includes("movies");
  console.log(link);
  const loggedIn = JSON.parse(sessionStorage.getItem("loggedIn") || "false");
  const user =
    loggedIn === false
      ? ""
      : JSON.parse(sessionStorage.getItem("user") || "{}");
  let navigate = useNavigate();
  const onLogOut = async () => {
    if (loggedIn === true) {
      sessionStorage.removeItem("loggedIn");
      navigate("/");
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
    <>
      {ok && (
        <MoviesMenu>
          <Nav>
            <MenuBar>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </Icon>
            </MenuBar>
            <NavList>
              <NavLi>
                <Link to="/">home</Link>
              </NavLi>
              {loggedIn ? (
                <>
                  <NavLi>
                    <Link to="/upload">upload</Link>
                  </NavLi>
                  <NavLi>
                    <Link to={`users/${user?._id}`}>
                      {user?.username} profile
                    </Link>
                  </NavLi>
                  <NavLi>
                    <LogOut onClick={onLogOut}>log out</LogOut>
                  </NavLi>
                </>
              ) : (
                <>
                  <NavLi>
                    <Link to="/login">login</Link>
                  </NavLi>
                  <NavLi>
                    <Link to="/join">join</Link>
                  </NavLi>
                </>
              )}
            </NavList>
          </Nav>
        </MoviesMenu>
      )}
      {!ok && (
        <Menu>
          <Nav>
            <MenuBar>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </Icon>
            </MenuBar>
            <NavList>
              <NavLi>
                <Link to="/">home</Link>
              </NavLi>
              {loggedIn ? (
                <>
                  <NavLi>
                    <Link to="/upload">upload</Link>
                  </NavLi>
                  <NavLi>
                    <Link to={`users/${user?._id}`}>
                      {user?.username} profile
                    </Link>
                  </NavLi>
                  <NavLi>
                    <LogOut onClick={onLogOut}>log out</LogOut>
                  </NavLi>
                </>
              ) : (
                <>
                  <NavLi>
                    <Link to="/login">login</Link>
                  </NavLi>
                  <NavLi>
                    <Link to="/join">join</Link>
                  </NavLi>
                </>
              )}
            </NavList>
          </Nav>
        </Menu>
      )}
    </>
  );
};

export default Header;
