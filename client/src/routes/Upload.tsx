import { useState } from "react";
import { useRecoilState } from "recoil";
import { atomMovieDB } from "../atom";

const categoryList = [
  { id: 1, data: "action" },
  { id: 2, data: "animation" },
  { id: 3, data: "crime" },
  { id: 4, data: "drama" },
  { id: 5, data: "comedy" },
  { id: 6, data: "thriller" },
  { id: 7, data: "horror" },
  { id: 8, data: "SF" },
  { id: 9, data: "Adult" },
  { id: 10, data: "fantasy" },
  { id: 11, data: "adventure" },
  { id: 12, data: "mystery" },
  { id: 13, data: "family" },
  { id: 14, data: "War" },
  { id: 15, data: "documentary" },
  { id: 16, data: "musical" },
  { id: 17, data: "Western" },
  { id: 18, data: "Etc" },
];

const Upload = () => {
  const [genres, setGenres] = useState([]) as any;
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    adult: false,
  }) as any;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = await (
      await fetch("http://localhost:5000/api/movies/upload", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie,
          genres,
        }),
      })
    ).json();
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

  const onCheckedElement = (event: any) => {
    const {
      target: { checked, value },
    } = event;

    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter((el: any) => el !== value));
    }
  };

  // const onRemove = (item: any) => {
  //   setGenres(genres.filter((el: any) => el !== item));
  // };

  return (
    <>
      <form onSubmit={onSubmit}>
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
          {categoryList.map((item) => (
            <label key={item.id}>
              {item.data}
              <input
                name={item.data}
                value={item.data}
                type="checkbox"
                onChange={onCheckedElement}
                defaultChecked={genres.includes(item.data) ? true : false}
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
