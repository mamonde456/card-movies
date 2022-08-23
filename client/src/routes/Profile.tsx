import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { userProfileData } from "../api";

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

const IconBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 17px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
`;
const Icon = styled.svg`
  padding: 8px;
`;
const UserVideos = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 10px;
  margin-top: 100px;
`;

const SectionTitle = styled.h3`
  padding: 10px;
`;
const UserVideoList = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
`;
const UserVideosLi = styled.li`
  width: 300px;
  height: 200px;
  position: relative;
  svg {
    right: 0px;
    top: 0px;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8));
  }
`;

const VideoImage = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const VideoTitle = styled.p`
  position: absolute;
  bottom: 0;
  right: 20px;
  font-size: 18px;
  color: white;
  font-weight: 700;
`;

const UserIcon = styled.svg`
  width: 45px;
  height: 45px;
  fill: white;
  margin-left: 10px;
`;

const UserCommentsWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
const UserCommentsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const UserCommentLi = styled.li`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: white;
  position: relative;
`;
const CommentImage = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const CommentName = styled.p``;
const CommentText = styled.p`
  font-size: 18px;
  font-weight: 700;
  padding-left: 65px;
`;
const CommentAt = styled.p`
  opacity: 0.5;
  font-size: 12px;
  padding-left: 65px;
`;

const MenuIcon = styled.svg`
  width: 45px;
  height: 45px;
  padding: 10px;
  fill: white;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const Profile = () => {
  const { userId } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const { isLoading: userLoading, data: userData } = useQuery(
    ["user-propfile", userId],
    () => userProfileData(userId || "")
  ) as any;
  console.log(userData, user);
  return (
    <Wrapper>
      {userLoading ? (
        <div>is Loading...</div>
      ) : (
        <>
          {" "}
          <UserInfo>
            <UserBox>
              {userData.avatarUrl ? (
                <Image bgPhoto={userData.avatarUrl}></Image>
              ) : (
                <UserIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z" />
                </UserIcon>
              )}
              <UserTitle>
                <Name>{userData.name}</Name>
                <Username>@{userData.username}</Username>
              </UserTitle>
            </UserBox>
            <Intro>{userData.info}</Intro>
            <UserEtc>
              <EtcBox>
                <IconBox>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
                  </Icon>
                </IconBox>
                <Email>{userData.email}</Email>
              </EtcBox>
              <EtcBox>
                <IconBox>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                  </Icon>
                </IconBox>
                <Location>{userData.location}</Location>
              </EtcBox>
            </UserEtc>
            {String(user._id) === String(userId) ? (
              <EditBtn>
                <Link to="edit-profile">edit Profile</Link>
              </EditBtn>
            ) : null}
          </UserInfo>
          <UserVideos>
            <SectionTitle>User Movies</SectionTitle>
            <UserVideoList>
              {userData?.videos?.map((el: any) => (
                <UserVideosLi key={el._id}>
                  <MenuIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 512"
                  >
                    <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" />
                  </MenuIcon>
                  <Link to={`/movies/${el._id}`}>
                    <VideoImage
                      bgPhoto={`http://localhost:5000/${el.thumbUrl}`}
                    ></VideoImage>
                    <VideoTitle>{el.title}</VideoTitle>
                  </Link>
                </UserVideosLi>
              ))}
            </UserVideoList>
          </UserVideos>
          <UserCommentsWrap>
            <SectionTitle>User Comments</SectionTitle>
            <UserCommentsList>
              {userData?.comments.map((comment: any) => (
                <UserCommentLi key={comment._id}>
                  <MenuIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 512"
                  >
                    <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" />
                  </MenuIcon>
                  <Link to={`/movies/${comment.videos}`}>
                    <CommentImage>
                      {userData.avatarUrl ? (
                        <Image bgPhoto={userData.avatarUrl}></Image>
                      ) : (
                        <UserIcon
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z" />
                        </UserIcon>
                      )}
                      <CommentName>{comment.name}</CommentName>
                    </CommentImage>
                    <CommentText>{comment.text}</CommentText>
                    <CommentAt>{comment.createdAt}</CommentAt>
                  </Link>
                </UserCommentLi>
              ))}
            </UserCommentsList>
          </UserCommentsWrap>
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
