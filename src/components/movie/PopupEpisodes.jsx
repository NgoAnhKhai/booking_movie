import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getEpisodes } from "../../services/GetEpisodes";
import { useNavigate } from "react-router-dom";

function EpisodePopup({ open, movieId, onClose }) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
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
    navigate(`/movie/watch/${movieId}/${ep.name || ep.id}`, {
      state: { episode: ep },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Danh sách tập</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {episodes.map((ep, i) => (
              <ListItem
                key={ep.name || ep.id}
                button
                onClick={() => handleSelectEpisode(ep)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: "#191924",
                  color: "#fff",
                  "&:hover": { bgcolor: "#28293e" },
                }}
              >
                <ListItemText
                  primary={`${i + 1}. ${ep.title || ep.name}`}
                  secondary={ep.description || ""}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default EpisodePopup;
