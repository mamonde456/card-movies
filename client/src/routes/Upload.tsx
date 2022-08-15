import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { atomMovieDB, categoryList, loggedInUser } from "../atom";

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
    <>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <label key="thumb">
          thumbnail file upload
          <input
            required
            name="thumb"
            id="thumb"
            type="file"
            accept="image/*"
          />
        </label>
        <label key="movie">
          movie file upload
          <input
            required
            name="movie"
            id="movie"
            type="file"
            accept="video/*"
          />
        </label>
        <input
          required
          onChange={onChange}
          name="title"
          placeholder="title"
          type="text"
        />
        <label key="adult">
          adult
          <input
            onChange={onChange}
            name="adult"
            value="adult"
            type="checkbox"
          />
        </label>
        <input
          required
          onChange={onChange}
          name="description"
          placeholder="description"
          type="text"
        />
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
      </form>
    </>
  );
};

export default Upload;
