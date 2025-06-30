import apiService from "../api/apiService";

export const GetDetailMovieByName = async (name) => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.movie.get_movie_detail",
      { params: { name } }
    );
    return response;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
};
