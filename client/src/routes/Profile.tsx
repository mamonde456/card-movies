import { response } from "express";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInUser } from "../atom";

const Wrapper = styled.div`
  padding-top: 100px;
  position: relative;
`;

const UserInfo = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px;
  position: relative;
`;

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url("http://localhost:5000/${(props) => props.bgPhoto}");
  background-size: cover;
  background-position: center;
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 100px;
  position: relative;
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  // flex-direction: column;
  gap: 20px;
  align-items: center;
  p {
    margin: 10px 0px;
  }
`;

const UserTitle = styled.div`
  color: white;
`;
const Name = styled.p`
  font-size: 32px;
  font-weight: 700;
`;
const Username = styled.p`
  font-size: 12px;
  opacity: 0.5;
`;
const Intro = styled.p`
  width: 100%;
  height: 150px;
  padding: 10px 40px;
  color: white;
  border-bottom: solid 1px rgba(255, 255, 255, 0.3);
`;

const UserEtc = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  padding-bottom: 10px;
`;
const EtcBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
const Email = styled.span``;

const Location = styled.p``;
const EditBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
`;
const EditInfo = styled.div<{ display: Boolean }>`
  width: 100%;
  background: #2c3333;
  position: absolute;
  left: ${(props) => (props.display ? "-105%" : "0")};
  // left: 0;
  top: 0;
  trasition: ease 0.5s;
  // p {
  //   position: absolute;
  //   top: 100px;
  //   left: 100px;
  // }
`;

const IconBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 17px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
`;
const Icon = styled.svg`
  padding: 8px;
`;

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState(loggedInUser) as any;
  const data = JSON.parse(sessionStorage.getItem("user") as any);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setUser(data);
  }, []);

  return (
    <Wrapper>
      <UserInfo>
        <UserBox>
          <Image bgPhoto={user.avatarUrl}></Image>
          <UserTitle>
            <Name>{user.name}</Name>
            <Username>@{user.username}</Username>
          </UserTitle>
        </UserBox>
        <Intro>{user.info}</Intro>
        <UserEtc>
          <EtcBox>
            <IconBox>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
              </Icon>
            </IconBox>
            <Email>{user.email}</Email>
          </EtcBox>
          <EtcBox>
            <IconBox>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
              </Icon>
            </IconBox>
            <Location>{user.location}</Location>
          </EtcBox>
        </UserEtc>
        {String(user._id) === String(userId) ? (
          <EditBtn>
            <Link to="edit-profile" onChange={() => setIsShow(!isShow)}>
              edit Profile
            </Link>
          </EditBtn>
        ) : null}
      </UserInfo>
      <div>
        <ul>
          {user.videos.map((el: any) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {user.comments.map((el: any) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
      {/* animation*/}
      <EditInfo display={isShow}>
        <Link to={"/" + userId} onChange={() => setIsShow(!isShow)}>
          <p>뒤로가기</p>
        </Link>
        <div>
          <Outlet />
        </div>
      </EditInfo>
    </Wrapper>
  );
};

export default Profile;
