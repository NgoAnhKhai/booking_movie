const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://cinemax.localhost:8000/";

/**
 * Encode segment cuối cùng (file name) cho mọi url (kể cả đã là absolute)
 */
function encodeLastSegment(url) {
  if (!url) return "";
  try {
    const [main, searchHash = ""] = url.split(/(?=[?#])/);
    const lastSlashIdx = main.lastIndexOf("/");
    if (lastSlashIdx === -1) return url;
    const prefix = main.substring(0, lastSlashIdx + 1);
    const fileName = main.substring(lastSlashIdx + 1);
    return prefix + encodeURIComponent(fileName) + searchHash;
  } catch {
    return url;
  }
}

export function formatMediaUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) {
    return encodeLastSegment(url);
  }
  if (url.startsWith("/files/")) {
    const full = `${API_URL.replace(/\/$/, "")}${url}`;
    return encodeLastSegment(full);
  }
  return url;
}
