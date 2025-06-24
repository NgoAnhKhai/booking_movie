import apiService from "../api/apiService";

export const GetPopularMovies = async () => {
  try {
    const response = await apiService.get(
      `/api/method/cinema.api.movie.get_top_movies?limit=10`
    );
    return response;
  } catch (error) {
    console.log("Error fetching popular movies:", error);
    throw error;
  }
};
