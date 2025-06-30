function formatDuration(minutes) {
  if (!minutes || isNaN(minutes)) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}g ${m}ph`;
  if (h > 0) return `${h}g`;
  return `${m}ph`;
}
export default formatDuration;
