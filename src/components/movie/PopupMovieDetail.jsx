import {
  Box,
  Typography,
  Chip,
  Avatar,
  Button,
  IconButton,
  Stack,
  Fade,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EpisodePopup from "./PopupEpisodes";

export default function PopUpMovieDetail({ open, data, onClose }) {
  if (!data) return null;
  const {
    title,
    image_horizontal,
    trailer,
    overview,
    genres = [],
    cast = [],
    avg_rating,
    total_ratings,
    release_date,
    is_premium,
    name,
  } = data;
  const navigate = useNavigate();

  const [episodeOpen, setEpisodeOpen] = useState(false);

  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";
  const duration = "2g 11ph";

  // Xem tập đầu
  const handleStartWatching = () => {
    if (!name) return;
    onClose && onClose();
    navigate(`/movie/watch/${name}`);
  };

  // Mở popup tập phim
  const handleShowEpisodes = () => setEpisodeOpen(true);

  // Khi chọn một tập từ EpisodePopup
  const handleSelectEpisode = (ep) => {
    setEpisodeOpen(false);
    onClose && onClose();
    // Truyền info tập qua state (hoặc query nếu muốn)
    navigate(`/movie/watch/${name}`, { state: { episode: ep } });
  };

  return (
    <>
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            zIndex: 2000,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
          onClick={onClose}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: 900,
              borderRadius: 4,
              overflow: "hidden",
              bgcolor: "#191924",
              position: "relative",
              boxShadow: 24,
            }}
          >
            {/* Video trailer hoặc fallback là ảnh horizontal */}
            <Box sx={{ position: "relative", height: 440, overflow: "hidden" }}>
              {trailer ? (
                <video
                  key={trailer}
                  src={trailer}
                  poster={image_horizontal}
                  autoPlay
                  muted
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    background: "#111",
                  }}
                />
              ) : (
                <img
                  src={image_horizontal}
                  alt={title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {/* Gradient mờ lên trên */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "44%",
                  background:
                    "linear-gradient(to top, #191924 25%, rgba(25,25,36,0.01) 100%)",
                }}
              />
              {/* Nút đóng */}
              <IconButton
                onClick={onClose}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "#fff",
                  bgcolor: "rgba(0,0,0,0.3)",
                  "&:hover": { bgcolor: "#191924" },
                }}
              >
                <CloseIcon />
              </IconButton>
              {/* Tiêu đề to */}
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  color: "#fff",
                  position: "absolute",
                  left: 32,
                  bottom: 120,
                  fontSize: 54,
                  lineHeight: 1.1,
                  letterSpacing: 2,
                  textShadow: "0 3px 24px #000, 0 1px 2px #000",
                }}
              >
                {title}
              </Typography>
              {/* Action buttons nằm dưới title, đè lên video */}
              <Stack
                direction="row"
                gap={2}
                sx={{
                  position: "absolute",
                  left: 32,
                  bottom: 58,
                  zIndex: 2,
                  alignItems: "center",
                  "& button, & .MuiIconButton-root": {
                    boxShadow: "0 2px 12px 0 #0006",
                  },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: 18,
                    px: 3,
                    background: "#B43FEB",
                    color: "#fff",
                    "&:hover": {
                      background: "#9B41F7",
                    },
                  }}
                  onClick={handleStartWatching}
                >
                  BẮT ĐẦU XEM
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: 18,
                    px: 3,
                    background: "#22223b",
                    color: "#fff",
                    "&:hover": { background: "#191924" },
                  }}
                  onClick={handleShowEpisodes}
                >
                  EPISODE
                </Button>
                <IconButton
                  sx={{
                    bgcolor: "#191924",
                    color: "#fff",
                    border: "1px solid #333",
                    "&:hover": { bgcolor: "#232335" },
                  }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "#191924",
                    color: "#fff",
                    border: "1px solid #333",
                    "&:hover": { bgcolor: "#232335" },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Stack>
            </Box>

            {/* Info và action, rút ngắn lại */}
            <Box px={4} pt={2} pb={2} sx={{ color: "#fff" }}>
              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <Typography fontWeight={700} fontSize={18} color="#fff">
                  {releaseYear}
                </Typography>
                <Typography color="text.secondary" fontWeight={700}>
                  {duration}
                </Typography>
                <Chip
                  label={is_premium ? "PREMIUM" : "MIỄN PHÍ"}
                  size="small"
                  sx={{
                    bgcolor: is_premium ? "#FF6F61" : "#22c55e",
                    color: "#fff",
                    fontWeight: 700,
                    mx: 1,
                  }}
                />
                <StarIcon sx={{ color: "#FFD700", fontSize: 20, ml: 1 }} />
                <Typography fontWeight={700} color="#fff" fontSize={16}>
                  {avg_rating?.toFixed(1) || "0.0"}
                </Typography>
                <Typography color="text.secondary" fontSize={13}>
                  ({total_ratings} đánh giá)
                </Typography>
              </Stack>
              <Typography color="#fff" fontWeight={700} mb={0.5}>
                Thể loại:{" "}
                {genres.map((g) => (
                  <Chip
                    key={g}
                    label={g}
                    sx={{
                      bgcolor: "#28293e",
                      color: "#fff",
                      fontWeight: 700,
                      mx: 0.5,
                      fontSize: 15,
                    }}
                    size="small"
                  />
                ))}
              </Typography>
              <Typography color="#fff" mt={1} mb={2}>
                {overview}
              </Typography>
              {/* Dàn diễn viên */}
              <Typography color="#fff" fontWeight={700}>
                Diễn viên:
                {cast.length === 0 && " Đang cập nhật"}
              </Typography>
              <Stack direction="row" gap={2} mt={1}>
                {cast.slice(0, 4).map((actor) => (
                  <Box
                    key={actor.id}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Avatar src={actor.image} alt={actor.full_name} />
                    <Box>
                      <Typography fontWeight={700} color="#fff" fontSize={15}>
                        {actor.full_name}
                      </Typography>
                      <Typography color="text.secondary" fontSize={13}>
                        {actor.role_name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Popup tập phim */}
      <EpisodePopup
        open={episodeOpen}
        movieId={name}
        onClose={() => setEpisodeOpen(false)}
        onSelectEpisode={handleSelectEpisode}
      />
    </>
  );
}
