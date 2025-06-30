import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState, useEffect } from "react";
import { getEpisodes } from "../../services/GetEpisodes";
import { useNavigate } from "react-router-dom";
import { formatMediaUrl } from "../../utils/formatMediaUrl";

function EpisodePopup({ open, movieId, onClose }) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const res = await getEpisodes(movieId);
        setEpisodes(res.data || []);
      } catch (error) {
        console.error(error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [open, movieId]);

  const handleSelectEpisode = (ep) => {
    onClose && onClose();
    navigate(`/watch/movie/${movieId}/episode/${ep.name || ep.id}`, {
      state: { episode: ep },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#191826",
          borderRadius: 5,
          border: "2px solid #B43FEB",
          boxShadow: "0 4px 48px #0e021d77",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 900,
          fontSize: 26,
          color: "#fff",
          bgcolor: "#232038",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          px: 4,
          py: 2.3,
          borderBottom: "1.5px solid #3a2868",
          letterSpacing: 0.5,
        }}
      >
        Danh sách tập
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          bgcolor: "#191826",
          px: 3,
          pb: 2,
          minHeight: 120,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={180}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <List sx={{ px: 0 }}>
            {episodes.map((ep, i) => (
              <ListItem
                key={ep.episode_name || ep.id || i}
                alignItems="flex-start"
                onClick={() => handleSelectEpisode(ep)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                sx={{
                  mb: 1.4,
                  borderRadius: 3,
                  background:
                    hovered === i
                      ? "linear-gradient(90deg, #24184b 0%, #31104c 100%)"
                      : "#181829",
                  color: "#fff",
                  border:
                    hovered === i ? "2.2px solid #B43FEB" : "2px solid #232334",
                  boxShadow:
                    hovered === i
                      ? "0 4px 16px #b43feb33"
                      : "0 2px 8px #15092955",
                  alignItems: "center",
                  cursor: "pointer",
                  px: 2,
                  py: 1.7,
                  minHeight: 88,
                  transition: "all 0.18s cubic-bezier(.61,.04,.38,1.02)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ảnh tập phim */}
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={formatMediaUrl(ep.image)}
                    alt={ep.episode_name}
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: 2.3,
                      background: "#2a2453",
                      boxShadow:
                        hovered === i ? "0 4px 14px #b43feb55" : "none",
                      mr: 2,
                    }}
                  >
                    <Typography fontWeight={700} color="#B43FEB" fontSize={18}>
                      {i + 1}
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                {/* Nội dung info */}
                <Box flex={1} sx={{ overflow: "hidden" }}>
                  <Box display="flex" alignItems="center" gap={2} mb={0.3}>
                    <Typography
                      fontWeight={900}
                      fontSize={18}
                      color="#fff"
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                        fontFamily: "Montserrat, Arial",
                      }}
                    >
                      {ep.episode_name}
                    </Typography>
                    <Typography fontSize={14} color="#b5b5d2" sx={{ ml: 1 }}>
                      {ep.duration || ""}
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={15}
                    color="#c7c7db"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: "inherit",
                    }}
                  >
                    {ep.description || ""}
                  </Typography>
                </Box>
                {/* Nút play khi hover */}
                <IconButton
                  size="medium"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 26,
                    transform: "translateY(-50%)",
                    bgcolor: hovered === i ? "#B43FEB" : "#232334",
                    color: "#fff",
                    boxShadow:
                      hovered === i ? "0 0 14px #B43FEB88" : "0 2px 8px #0003",
                    transition: "all 0.18s",
                    opacity: hovered === i ? 1 : 0,
                    pointerEvents: hovered === i ? "auto" : "none",
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EpisodePopup;
