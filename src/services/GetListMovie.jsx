import apiService from "../api/apiService";

export const getListMovie = async () => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.movie.get_all_movies"
    );
    return response;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};
