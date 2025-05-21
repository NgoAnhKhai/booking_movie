import apiService from "../api/apiService";

export const getRouteDistance = async (start, end) => {
  try {
    const response = await apiService.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/json",
      {
        coordinates: [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],
      },
      {
        headers: {
          Authorization: import.meta.env.REACT_APP_ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // response đã unwrap data do interceptor => có thể truy cập thẳng data
    return response.features[0].properties.summary.distance; // khoảng cách tính bằng mét
  } catch (error) {
    console.error("Error fetching route distance:", error);
    throw error;
  }
};
