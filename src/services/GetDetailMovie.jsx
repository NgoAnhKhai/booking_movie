import apiService from "../api/apiService";

export const getDetailMovie = async (title) => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.movie.get_movie_detail",
      { params: { title } }
    );
    return response;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
};
