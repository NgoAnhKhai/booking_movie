import apiService from "../api/apiService";

export const getEpisodesDetail = async (episode_id) => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.episode.get_episode_detail",
      { params: { episode_id } }
    );
    return response;
  } catch (error) {
    console.error("Error fetching episode details:", error);
    throw new Error("Failed to fetch episode details");
  }
};
