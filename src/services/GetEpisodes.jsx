import apiService from "../api/apiService";

export const getEpisodes = async (movie_id) => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.movie.get_movie_episodes",
      { params: { movie_id } }
    );
    return response;
  } catch (error) {
    console.log("Error fetching episodes:", error);
    throw new Error("Failed to fetch episodes");
  }
};
