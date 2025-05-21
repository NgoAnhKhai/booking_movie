// src/hooks/useCinemas.js
import { useState, useEffect } from "react";

export const useCinemas = (cities, selectedCity) => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");

  useEffect(() => {
    if (!selectedCity) {
      setCinemas([]);
      setSelectedCinema("");
      return;
    }
    const city = cities.find((c) => c.name === selectedCity);
    if (city && city.cinemas) {
      setCinemas(city.cinemas);
      setSelectedCinema(city.cinemas[0]?.id || "");
    } else {
      setCinemas([]);
      setSelectedCinema("");
    }
  }, [selectedCity, cities]);

  return { cinemas, selectedCinema, setSelectedCinema };
};
