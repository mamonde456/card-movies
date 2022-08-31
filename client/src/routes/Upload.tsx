import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserMovies } from "../api";
import { atomMovieDB, categoryList, loggedInUser } from "../atom";
import ErrorMsg from "../components/ErrorMsg";
import Header from "../components/Header";

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
const AdultLable = styled.label`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AdultInput = styled.input`
  display: none;
`;
const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: solid 1px white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 12px;
    height: 12px;
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

const GenreBox = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const GenreLabel = styled.label`
  // width: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0px 10px;
`;

const GenreInput = styled.input`
  display: none;
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
interface IError {
  errorTitle?: string;
  errorMessage: string;
}
const Upload = () => {
  const category = useRecoilValue(categoryList) as any;
  const [isChecked, setIsChecked] = useState(false);
  const [isGenres, setIsGenres] = useState([]) as any;
  const [error, setError] = useState<IError>();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  let navigator = useNavigate();
  const onSubmit = async (event: any) => {
    // title value Property 'value' does not exist on type 'string'. React.FormEvent<HTMLFormElement>
    event.preventDefault();
    const {
      currentTarget: { thumb, movie, title, overview, adult },
    } = event;

    const formData = new FormData();
    formData.append("thumb", thumb.files[0]);
    formData.append("movie", movie.files[0]);
    formData.append("userId", user ? user._id : null);
    formData.append("title", title.value);
    formData.append("overview", overview.value);
    formData.append("adult", adult.value);
    formData.append("genres", isGenres);
    const response = await fetch("http://localhost:5000/api/movies/upload", {
      method: "post",
      body: formData,
    });
    if (response.status === 200) {
      navigator("/movies");
    } else if (response.status === 400) {
      const data = await response.json();
      setError(data);
    }
  };
  const onChange = (event: any) => {
    //target nextsibling 인식 못함
    const {
      target: { name, value },
    } = event;

    if (name === "adult" && event.target.checked === true) {
      event.target.nextSibling.style.backgroundColor = "white";
      event.target.nextSibling.children[0].style.fill = "black";
    } else if (name === "adult" && event.target.checked === false) {
      event.target.nextSibling.style.backgroundColor = "transparent";
      event.target.nextSibling.children[0].style.fill = "white";
    }
  };

  const onCheckedElement = ({ target }: any) => {
    setIsChecked(!isChecked);
    handleCheckedValue(
      target.previousSibling.previousSibling,
      target.value,
      target.checked
    );
  };

  const handleCheckedValue = (el: any, value: string, isChecked: boolean) => {
    if (isChecked) {
      setIsGenres([...isGenres, value]);
      el.style.backgroundColor = "white";
      el.children[0].style.fill = "black";
    } else if (!isChecked && isGenres.find((el: string) => el === value)) {
      const filter = isGenres.filter((el: string) => el !== value);
      setIsGenres([...filter]);
      el.style.backgroundColor = "transparent";
      el.children[0].style.fill = "white";
    }
  };

  return (
    <Wrapper>
      <Header></Header>
      <h1>Upload Movie</h1>
      <UploadForm encType="multipart/form-data" onSubmit={onSubmit}>
        <UploadFileWrapper>
          <SectionTitle>File Uploader</SectionTitle>
          <p>Thumbnail</p>
          <UploadFileBox>
            <UploadFile
              required
              name="thumb"
              id="thumb"
              type="file"
              accept="image/*"
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
            <UploadFileBtn htmlFor="movie">
              search file...
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM288.1 344.1C284.3 349.7 278.2 352 272 352s-12.28-2.344-16.97-7.031L216 305.9V408c0 13.25-10.75 24-24 24s-24-10.75-24-24V305.9l-39.03 39.03c-9.375 9.375-24.56 9.375-33.94 0s-9.375-24.56 0-33.94l80-80c9.375-9.375 24.56-9.375 33.94 0l80 80C298.3 320.4 298.3 335.6 288.1 344.1z" />
              </Icon>
            </UploadFileBtn>
          </UploadFileBox>
        </UploadFileWrapper>
        <SectionTitle>Movie Information</SectionTitle>
        <TitleWrapper>
          <TitleBox>
            <TitleLabel htmlFor="title">Movie title</TitleLabel>
            <UploadInput
              required
              id="title"
              name="title"
              placeholder="title"
              type="text"
            />
          </TitleBox>
          <AdultLable htmlFor="adult">
            <p>Adult</p>
            <AdultInput
              onChange={onChange}
              id="adult"
              name="adult"
              value="adult"
              type="checkbox"
            />
            <CheckBox>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
              </Icon>
            </CheckBox>
          </AdultLable>
        </TitleWrapper>
        <TitleLabel htmlFor="overview">Movie overview</TitleLabel>
        <UploadTextArea
          required
          id="overview"
          name="overview"
          placeholder="overview"
        />

        <TitleLabel>Genres</TitleLabel>
        <GenreBox>
          {category.map((item: any) => (
            <GenreLabel key={item.id} htmlFor={item.id}>
              <CheckBox>
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </Icon>
              </CheckBox>
              <p>{item.data}</p>
              <GenreInput
                name="genres"
                id={item.id}
                value={item.data}
                type="checkbox"
                onChange={(e) => onCheckedElement(e)}
                // defaultChecked={isGenres.includes(item.data) ? true : false}
              />
            </GenreLabel>
          ))}
        </GenreBox>
        <UploadBtn>save</UploadBtn>
        {error && <ErrorMsg error={error}></ErrorMsg>}
      </UploadForm>
    </Wrapper>
  );
};

export default Upload;
