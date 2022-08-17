import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { atomMovieDB, categoryList, loggedInUser } from "../atom";

const Wrapper = styled.div`
  padding-top: 100px;
  color: white;
`;

const UploadForm = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const UploadFileWrapper = styled.div`
  padding: 30px 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 50px;
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

const UploadInput = styled.input`
  padding: 10px;
  height: 50px;
  background: none;
  border: none;
  border-bottom: solid 1px rgba(255, 255, 255, 0.8);
`;

const GenreList = styled.div``;

const Genre = styled.input``;

const Upload = () => {
  const category = useRecoilValue(categoryList) as any;
  const [isChecked, setIsChecked] = useState(false);
  const [isGenres, setIsGenres] = useState([]) as any;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    adult: false,
  }) as any;
  let navigator = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumb", e.target.thumb.files[0]);
    formData.append("movie", e.target.movie.files[0]);
    formData.append("userId", user._id || "");
    formData.append("title", movie.title);
    formData.append("description", movie.description);
    formData.append("adult", movie.adult);
    formData.append("genres", isGenres);

    const response = await fetch("http://localhost:5000/api/movies/upload", {
      method: "post",
      body: formData,
    });
    if (response.status === 200) {
      navigator("/");
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data);
    }
  };
  const onChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const onCheckedElement = ({ target }: any) => {
    setIsChecked(!isChecked);
    handleCheckedValue(target.parentNode, target.value, target.checked);
  };

  const handleCheckedValue = (el: any, value: any, isChecked: any) => {
    if (isChecked) {
      setIsGenres([...isGenres, value]);
      el.style.backgroundColor = "black";
    } else if (!isChecked && isGenres.find((el: any) => el === value)) {
      const filter = isGenres.filter((el: any) => el !== value);
      setIsGenres([...filter]);
      el.style.backgroundColor = "white";
    }
  };

  // const onRemove = (item: any) => {
  //   setGenres(genres.filter((el: any) => el !== item));
  // };

  return (
    <Wrapper>
      <UploadForm encType="multipart/form-data" onSubmit={onSubmit}>
        <UploadFileWrapper>
          <p>Thumbnail</p>
          <UploadFileBox>
            <UploadFile
              required
              name="thumb"
              id="thumb"
              type="file"
              accept="image/*"
              // style={{ display: "none" }}
            />
            <UploadFileBtn htmlFor="thumb">
              search file...
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM288.1 344.1C284.3 349.7 278.2 352 272 352s-12.28-2.344-16.97-7.031L216 305.9V408c0 13.25-10.75 24-24 24s-24-10.75-24-24V305.9l-39.03 39.03c-9.375 9.375-24.56 9.375-33.94 0s-9.375-24.56 0-33.94l80-80c9.375-9.375 24.56-9.375 33.94 0l80 80C298.3 320.4 298.3 335.6 288.1 344.1z" />
              </Icon>
            </UploadFileBtn>
          </UploadFileBox>
          <p>Movie</p>
          <UploadFileBox>
            <UploadFile
              required
              name="movie"
              id="movie"
              type="file"
              accept="video/*"
            />
            <UploadFileBtn htmlFor="thumb">
              search file...
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM288.1 344.1C284.3 349.7 278.2 352 272 352s-12.28-2.344-16.97-7.031L216 305.9V408c0 13.25-10.75 24-24 24s-24-10.75-24-24V305.9l-39.03 39.03c-9.375 9.375-24.56 9.375-33.94 0s-9.375-24.56 0-33.94l80-80c9.375-9.375 24.56-9.375 33.94 0l80 80C298.3 320.4 298.3 335.6 288.1 344.1z" />
              </Icon>
            </UploadFileBtn>
          </UploadFileBox>
        </UploadFileWrapper>
        <label htmlFor="title">Movie title</label>
        <UploadInput
          required
          id="title"
          onChange={onChange}
          name="title"
          placeholder="title"
          type="text"
        />
        <label htmlFor="description">Movie Overview</label>
        <UploadInput
          required
          onChange={onChange}
          id="description"
          name="description"
          placeholder="description"
          type="textarea"
        />
        <label htmlFor="adult">adult</label>
        <input onChange={onChange} name="adult" value="adult" type="checkbox" />
        <div>
          {category.map((item: any) => (
            <label key={item.id}>
              {item.data}
              <input
                name="genres"
                value={item.data}
                type="checkbox"
                onChange={(e) => onCheckedElement(e)}
                // defaultChecked={isGenres.includes(item.data) ? true : false}
              />
            </label>
          ))}
        </div>
        <div>
          {/* {genres === 0 && <p>장르를 선택해주세요.</p>} */}
          {/* {genres?.map((item: any) => (
            <>
              <p>{item}</p>
              <p onClick={() => onRemove(item)}>X</p>
            </>
          ))} */}
        </div>
        <button>save</button>
      </UploadForm>
    </Wrapper>
  );
};

export default Upload;
