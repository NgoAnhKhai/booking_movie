export const determineRegion = (latitude, longitude) => {
  if (latitude >= 16) {
    return "north"; // Bắc
  }
  if (latitude >= 11) {
    // Trung có thể phân chia thêm theo longitude
    if (longitude >= 108 && longitude <= 110) {
      return "central";
    } else {
      return "south"; // Phần Nam Trung Bộ hoặc Nam
    }
  }
  return "south"; // Nam
};

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // bán kính trái đất km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
