import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { atomMovieDB, categoryList } from "../atom";

const Upload = () => {
  const category = useRecoilValue(categoryList) as any;
  const [isChecked, setIsChecked] = useState(false);
  const [isGenres, setIsGenres] = useState([]) as any;

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
          {category.map((item: any) => (
            <label key={item.id}>
              {item.data}
              <input
                name={item.data}
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
