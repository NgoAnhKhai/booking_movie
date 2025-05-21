import { useState, useEffect } from "react";
import movieData from "../../public/movies_data.json";

export const useMovie = (id) => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const selectedMovie = movieData.find((movie) => movie.id === parseInt(id));
    setMovie(selectedMovie);
  }, [id]);
  return movie;
};
