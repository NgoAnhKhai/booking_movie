
export const determineRegion = (latitude) => {
    if (latitude >= 16) return "north"; // Bắc
    if (latitude >= 11) return "central"; // Trung
    return "south"; // Nam
  };
  