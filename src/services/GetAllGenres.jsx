import apiService from "../api/apiService";

export const getAllGenres = async () => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.genre.get_all_genres"
    );
    return response;
  } catch (error) {
    console.log("Error fetching all genres:", error);
    throw error;
  }
};
