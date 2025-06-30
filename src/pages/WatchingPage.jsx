import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Button, Avatar, Skeleton } from "@mui/material";
import { GetEpisodeDetail } from "../services/GetEpisodeDetail";
import { GetDetailMovieByName } from "../services/GetDetailMovieByName";
import YouTubeCustomPlayer from "../components/VideoPlayed/YoutubeCustomPlayer";
import { formatMediaUrl } from "../utils/formatMediaUrl";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ClampText from "../components/ClampText";
const WatchingPage = () => {
  const { movie_id, episode_id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [epRes, mvRes] = await Promise.all([
          GetEpisodeDetail(episode_id),
          GetDetailMovieByName(movie_id),
        ]);
        setEpisode(epRes.data);
        setMovie(mvRes.data);
      } catch (err) {
        setError("Không thể tải dữ liệu phim hoặc tập phim.");
        setEpisode(null);
        setMovie(null);
        console.error("Error fetching movie/episode detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [episode_id, movie_id]);
  const videoUrl = useMemo(
    () => formatMediaUrl(episode?.video_url),
    [episode?.video_url]
  );
  if (loading) {
    return (
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#fff"
        >
          <Skeleton variant="rectangular" width={700} height={400} />
        </Box>
      </Box>
    );
  }

  if (error || !episode || !movie) {
    return (
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#181820" }}>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#fff"
        >
          <Typography color="#ff507b" fontSize={22} fontWeight={700}>
            {error || "Không có dữ liệu phim/tập phim!"}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "150vh",
        overflow: "hidden",
      }}
    >
      {/* Content Chính */}
      <Box
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 0,
          overflowY: "auto",
          py: 4,
        }}
      >
        {/* Player: maxWidth, giữ tỉ lệ, không tràn màn hình */}
        <Box
          sx={{
            width: "94vw",
            maxWidth: 970,
            height: "74vh",
            mb: 3,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 4,
            background: "#181820",
            position: "relative",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <YouTubeCustomPlayer url={videoUrl} />
        </Box>

        {/* Movie Info */}
        <Box sx={{ width: "94vw", maxWidth: 960, color: "#fff" }}>
          <Chip
            label={`PG-${movie.age_limit}`}
            size="small"
            sx={{
              bgcolor: "#28293e",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              px: 1.2,
              mb: 1,
              borderRadius: 1,
            }}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            mb={1}
            sx={{ mt: 0, color: "#fff", fontSize: 28 }}
          >
            {movie.title}
          </Typography>

          {/* Rating, Genres, Download, Share, Like row */}
          <Box display="flex" alignItems="center" mb={1.5} gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#FFD700",
                  bgcolor: "transparent",
                }}
              >
                ★
              </Box>
              <Typography fontWeight={700} color="#FFD700" fontSize={18} mr={1}>
                {movie.total_ratings.toFixed(1) || "9.0"}
              </Typography>
              {(movie.genres || []).slice(0, 2).map((genre, i) => (
                <Chip
                  key={i}
                  label={genre}
                  size="small"
                  sx={{
                    bgcolor: "#23232A",
                    color: "#fff",
                    fontWeight: 700,
                    mx: 0.25,
                    height: 24,
                    fontSize: 13,
                    borderRadius: 1.5,
                  }}
                />
              ))}
            </Box>
            <Box flex={1} />
            {/* Action buttons */}
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                px: 3,
                borderRadius: 2.5,
                boxShadow: "none",
                textTransform: "none",
                height: 44,
                minWidth: 140,
                "&:hover": {
                  borderColor: "#ff466a",
                  color: "#ff466a",
                  background: "rgba(255,70,106,0.08)",
                },
              }}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                px: 3,
                borderRadius: 2.5,
                boxShadow: "none",
                textTransform: "none",
                height: 44,
                minWidth: 120,
                "&:hover": {
                  borderColor: "#ff466a",
                  color: "#ff466a",
                  background: "rgba(255,70,106,0.08)",
                },
              }}
            >
              Share
            </Button>
            <Button
              variant="contained"
              startIcon={<ThumbUpIcon />}
              sx={{
                bgcolor: "#ff466a",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                px: 3,
                borderRadius: 3.5,
                boxShadow: "none",
                textTransform: "none",
                height: 44,
                minWidth: 120,
                "&:hover": { bgcolor: "#e23562" },
              }}
            >
              Like
            </Button>
          </Box>

          {/* Story Line */}
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={700} fontSize={17} mb={0.5} mt={1}>
              Story Line
            </Typography>
            <ClampText line={2} sx={{ color: "#c5c5d1", fontSize: 15 }}>
              {movie.overview}
            </ClampText>
          </Box>

          {/* Top Cast */}
          <Typography fontWeight={700} mb={1} fontSize={16}>
            Top Cast
          </Typography>
          <Box display="flex" gap={4} alignItems="flex-end" mb={1}>
            {(movie.cast || []).slice(0, 4).map((actor) => (
              <Box
                key={actor.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ minWidth: 78 }}
              >
                <Avatar
                  src={actor.image}
                  alt={actor.full_name}
                  sx={{
                    width: 54,
                    height: 54,
                    mb: 0.5,
                    border: "2.5px solid #181820",
                    boxShadow: "0 2px 8px #0004",
                  }}
                />
                <Typography
                  fontWeight={700}
                  color="#fff"
                  fontSize={14}
                  align="center"
                  noWrap
                >
                  {actor.full_name}
                </Typography>
                <Typography fontSize={13} color="#aaa" align="center" noWrap>
                  {actor.role_name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WatchingPage;
