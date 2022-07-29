import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB } from "../atom";

const EditMovie = () => {
  const movies = useRecoilValue(atomMovieDB);
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]) as any;
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const data = movies.find((el) => {
      return el._id === movieId;
    });
    setMovie(data);
    const isAdult = data?.adult;
    setChecked(isAdult || false);
  }, []);
  console.log(movie, checked);
  return (
    <>
      <h1>edit movie</h1>
      <form>
        <input defaultValue={movie?.title}></input>
        <input defaultValue={movie?.description}></input>
        <input type="checkbox" checked={checked}></input>
      </form>
    </>
  );
};

export default EditMovie;
