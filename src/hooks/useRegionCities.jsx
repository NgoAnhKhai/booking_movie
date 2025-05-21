import { useState, useEffect } from "react";
import regionsData from "../../public/regions_data.json";
import {
  determineRegion,
  getDistanceFromLatLonInKm,
} from "../components/utils";

export const useRegionCities = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [region, setRegion] = useState("nam");

  useEffect(() => {
    const southRegion = regionsData.find(
      (region) => region.region.toLowerCase() === "miền nam"
    );
    if (southRegion) {
      setCities(southRegion.cities || []);
      if (southRegion.cities && southRegion.cities.length > 0) {
        setSelectedCity(southRegion.cities[0].name);
      }
    }
  }, []);

  useEffect(() => {
    if (cities.length === 0) return;

    if (!navigator.geolocation) {
      setRegion("nam");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Vị trí người dùng:", latitude, longitude);

        const userRegion = determineRegion(latitude, longitude);
        setRegion(userRegion);

        let closestCity = null;
        let minDistance = Infinity;

        for (const city of cities) {
          if (!city.latitude || !city.longitude) continue;
          const dist = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            city.latitude,
            city.longitude
          );
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = city.name;
          }
        }

        if (closestCity) {
          console.log("Thành phố gần nhất:", closestCity);
          setSelectedCity(closestCity);
        }
      },
      (error) => {
        console.warn("Vị trí không được cấp phép hoặc lỗi:", error);
        setRegion("nam");
      }
    );
  }, [cities]);

  return { cities, selectedCity, setSelectedCity };
};
