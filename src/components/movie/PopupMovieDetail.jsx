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
import { motion, AnimatePresence } from "framer-motion";
import EpisodePopup from "./PopupEpisodes";
import { useState } from "react";
import { formatMediaUrl } from "../../utils/formatMediaUrl";
import { getEpisodes } from "../../services/GetEpisodes";
import formatDuration from "../../utils/formatDuration";
import ClampText from "../ClampText";

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
    duration,
  } = data;
  const navigate = useNavigate();
  const [episodeOpen, setEpisodeOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const trailerUrl = formatMediaUrl(trailer);
  const durationFormat = formatDuration(duration);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";

  // Cập nhật: Xem tập đầu tiên
  const handleStartWatching = async () => {
    if (!name) return;
    try {
      const res = await getEpisodes(name);
      console.log("First episode response:", res.data);

      const episodes = res.data;
      const firstEp = episodes[0];
      onClose && onClose();
      navigate(`/watch/movie/${name}/episode/${firstEp.name}`);
    } catch (err) {
      console.error("Error fetching first episode:", err);
      alert("Không thể tải tập phim đầu tiên!");
    }
  };

  const handleShowEpisodes = () => setEpisodeOpen(true);

  const handleSelectEpisode = (ep) => {
    setEpisodeOpen(false);
    onClose && onClose();
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
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            pt: { xs: 9, md: 10 },
            overflowY: "auto",
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
              maxHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 96px)" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Khu vực video hoặc ảnh */}
            <Box
              sx={{
                position: "relative",
                height: 440,
                overflow: "hidden",
                cursor: "pointer",
                userSelect: "none",
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {trailerUrl ? (
                <video
                  key={trailerUrl}
                  src={trailerUrl}
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
                    "linear-gradient(to top, #191924 39%, rgba(25,25,36,0.01) 100%)",
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

              {/* TITLE & ACTIONS */}
              <motion.div
                initial={false}
                animate={{
                  position: "absolute",
                  left: 32,
                  zIndex: 2,
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  bottom: isHover ? 36 : 18,
                  gap: isHover ? 12 : 24,
                  transition: { type: "spring", stiffness: 340, damping: 45 },
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    fontSize: isHover ? 54 : 36,
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: 2,
                    lineHeight: 1.1,
                    textShadow: "0 3px 24px #000, 0 1px 2px #000",
                    y: 0,
                    marginBottom: isHover ? 6 : 0,
                    transition: { type: "spring", stiffness: 320, damping: 26 },
                  }}
                >
                  {title}
                </motion.div>
                {/* Hàng action btn - chỉ hiển thị khi hover */}
                <AnimatePresence>
                  {isHover && (
                    <motion.div
                      key="actions"
                      initial={{ opacity: 0, y: 28 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.07, duration: 0.33 },
                      }}
                      exit={{
                        opacity: 0,
                        y: 28,
                        transition: { duration: 0.19 },
                      }}
                      style={{ display: "flex", gap: 12, alignItems: "center" }}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Box>

            {/* Info & các phần còn lại */}
            <Box px={4} pt={2} pb={2} sx={{ color: "#fff" }}>
              <Stack direction="row" alignItems="center" gap={1} mb={2}>
                <Typography fontWeight={700} fontSize={18} color="#fff">
                  {releaseYear}
                </Typography>
                <Typography color="text.secondary" fontWeight={700}>
                  {durationFormat}
                </Typography>
                <Chip
                  label={is_premium ? "PREMIUM" : "FREE"}
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
                <ClampText line={2}>{overview}</ClampText>
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
