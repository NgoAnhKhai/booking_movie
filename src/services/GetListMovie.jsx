import axios from "axios";

export const getListMovie = async (page) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTA5NTkxYjk0ZjdhYjUzZTY0ODMxYjAxNjliOGNkOCIsIm5iZiI6MTcyNzkxNTQxNC41Niwic3ViIjoiNjZmZGU1OTZmYTNlNjllMGVmN2M2YjVmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ai3Yi8GWixeFun39_LpFASCmAvgDBKHaIbwLgDgWbGA";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const moviesWithVideoTrue = response.data.results.filter(
      (movie) => movie.video === true
    );

    return moviesWithVideoTrue;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
