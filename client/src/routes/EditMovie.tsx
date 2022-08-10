import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB, categoryList } from "../atom";

const EditMovie = () => {
  const movies = useRecoilValue(atomMovieDB);
  const categoryAtom = useRecoilValue(categoryList);
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]) as any;
  const [isAdult, setIsAdult] = useState(false);
  const [genres, setGenres] = useState([]) as any;
  const [isGenresChecked, setIsGenresChecked] = useState(false);
  useEffect(() => {
    const data = movies.find((el) => {
      return el._id === movieId;
    });
    setMovie(data);
    const isTrue = data?.adult;
    setIsAdult(isTrue || false);
    setGenres(data?.genres);
  }, []);

  const onCheckedElement = ({ target }: any) => {
    setIsGenresChecked(!isGenresChecked);
    handleCheckedValue(target.value, target.checked);
  };

  const handleCheckedValue = (value: string, isChecked: boolean) => {
    if (isChecked) {
      if (genres.find((el: string) => el === value)) {
        filterFn(value);
      }
      setGenres([...genres, value]);
    } else if (!isChecked && genres.find((el: string) => el === value)) {
      filterFn(value);
    }
  };
  const filterFn = (value: string) => {
    const filter = genres.filter((el: string) => el !== value);
    setGenres([...filter]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Tst");
    // await fetch("http://localhost:5000/api/movies/edit-movie",{
    //   method:"post",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify({
    //     genres
    //   })
    // })
  };

  return (
    <>
      <h1>edit movie</h1>
      <form onSubmit={onSubmit}>
        <input defaultValue={movie?.title || ""}></input>
        <input defaultValue={movie?.description || ""}></input>
        <label key="adult">
          Adult
          <input id="adult" type="checkbox" checked={isAdult} />
        </label>
        {categoryAtom.map((category) => (
          <label key={category.id}>
            {category.data}
            <input
              name={category.data}
              type="checkbox"
              value={category.data}
              onChange={(e) => onCheckedElement(e)}
              checked={genres.includes(category.data) ? true : false}
              // defaultChecked={genres.includes(category.data) ? true : false}
            />
          </label>
        ))}
      </form>
    </>
  );
};

export default EditMovie;
