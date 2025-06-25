import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEpisodesDetail } from "../services/GetEpisodeDetail";

// Hàm lấy YouTube embed URL từ mọi định dạng link YouTube phổ biến
function getYoutubeEmbedUrl(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const WatchingPage = () => {
  const { episode_id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getEpisodesDetail(episode_id);
        console.log("Episode detail response:", res.data);
        setEpisode(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin tập phim:", err);
        setError("Không lấy được thông tin tập phim!");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [episode_id]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        Đang tải tập phim...
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 24,
        }}
      >
        {error || "Không có thông tin tập phim!"}
      </div>
    );
  }

  // Kiểm tra có phải là video YouTube không
  const youtubeEmbed =
    episode.video_url && getYoutubeEmbedUrl(episode.video_url);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {youtubeEmbed ? (
        <iframe
          width="90%"
          height="600"
          src={youtubeEmbed}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            maxWidth: 1000,
            borderRadius: 12,
            background: "#111",
            aspectRatio: "16/9",
          }}
        />
      ) : (
        <video
          src={episode.video_url}
          controls
          autoPlay
          style={{
            width: "90vw",
            maxWidth: 1000,
            maxHeight: "70vh",
            borderRadius: 12,
            background: "#111",
          }}
        />
      )}
    </div>
  );
};

export default WatchingPage;
