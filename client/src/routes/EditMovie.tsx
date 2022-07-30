import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB, categoryList } from "../atom";

const EditMovie = () => {
  const movies = useRecoilValue(atomMovieDB);
  const categoryAtom = useRecoilValue(categoryList);
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]) as any;
  const [checked, setChecked] = useState(false);
  const [genres, setGenres] = useState([]) as any;
  const [isTrue, setISTrue] = useState([]) as any;

  useEffect(() => {
    const data = movies.find((el) => {
      return el._id === movieId;
    });
    setMovie(data);
    const isAdult = data?.adult;
    setChecked(isAdult || false);
    setGenres(data?.genres);
  }, []);
  return (
    <>
      <h1>edit movie</h1>
      <form>
        <input defaultValue={movie?.title}></input>
        <input defaultValue={movie?.description}></input>
        <input type="checkbox" checked={checked}></input>
        {categoryAtom.map((category) => (
          <label key={category.id}>
            {category.data}
            <input name={category.data} type="checkbox" />
          </label>
        ))}
      </form>
    </>
  );
};

export default EditMovie;
