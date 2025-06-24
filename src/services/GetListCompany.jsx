import apiService from "../api/apiService";

export const getListCompany = async () => {
  try {
    const response = await apiService.get(
      "/api/method/cinema.api.production_company.get_all_production"
    );
    return response;
  } catch (error) {
    console.error("Error fetching company list:", error);
    throw error;
  }
};
