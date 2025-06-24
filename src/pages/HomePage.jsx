import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getListMovie } from "../services/GetListMovie";
import { getListCompany } from "../services/GetListCompany";
import RightSidebar from "../components/RightSideBar";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [openTrailer, setOpenTrailer] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const moviesRes = await getListMovie();
        setMovies(moviesRes.data);

        const companiesRes = await getListCompany();
        setCompanies(companiesRes.data);
      } catch (err) {
        console.error("Error fetching movies or companies:", err);
        setError("Failed to load movies or companies.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box display="flex" flexDirection="row">
      {/* ==== Cột trái: Nội dung chính ==== */}
      <Box flex={7} p={0}>
        {/* Hero Banner */}
        {movies[0] && (
          <Card
            sx={{
              position: "relative",
              mb: 4,
              mt: 4,
              mr: "auto",
              borderRadius: 9,
              overflow: "hidden",
              height: 436,
              width: "97%",
            }}
          >
            <CardMedia
              component="img"
              src={movies[0].image_horizontal}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Overlay mờ đen từ trái qua phải */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                background: `linear-gradient(
                  90deg,
                  rgba(0,0,0,0.68) 0%,
                  rgba(0,0,0,0.36) 35%,
                  rgba(0,0,0,0.08) 80%,
                  rgba(0,0,0,0) 100%
                )`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 70,
                left: 24,
                color: "common.white",
                textShadow: "0 0 8px rgba(0,0,0,0.8)",
                zIndex: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(255,255,255,0.25)",
                  border: "1px solid",
                  borderColor: "rgba(255,255,255,0.6)",
                  color: "#fff",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "15px",
                  textTransform: "none",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                }}
              >
                Series
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                noWrap
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {movies[0].title}
              </Typography>
              <Typography color="#9CA4AC">
                {movies[0].season
                  ? `${movies[0].season} Season • ${movies[0].episodes} Episodes`
                  : movies[0].genres?.join(" • ") ?? "—"}
              </Typography>
              <Box mt={1.5} display="flex" alignItems="center">
                <Button
                  size="large"
                  sx={{
                    mr: 2,
                    borderRadius: 15,
                    backgroundColor: "#B43FEB",
                    color: "common.white",
                    width: 190,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#9a2dcc" },
                  }}
                  onClick={() => setOpenTrailer(true)}
                >
                  <img
                    src="/images/play_arrow_black_24dp.png"
                    alt="Play Icon"
                    width={24}
                    height={24}
                    style={{ marginRight: 8 }}
                  />
                  Watch Trailer
                </Button>
                <Button size="large" color="inherit">
                  <img
                    src="/images/save-2.png"
                    alt="Add Icon"
                    width={24}
                    height={24}
                    style={{ marginRight: 8 }}
                  />
                  Add Watchlist
                </Button>
              </Box>
            </Box>
          </Card>
        )}

        {/* === Trailer Modal === */}
        {openTrailer && movies[0]?.trailer && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "rgba(0,0,0,0.78)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(3px)",
            }}
            onClick={() => setOpenTrailer(false)}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "90vw", md: "60vw" },
                maxWidth: 900,
                bgcolor: "transparent",
                borderRadius: 3,
                boxShadow: 6,
                outline: "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nút đóng */}
              <IconButton
                onClick={() => setOpenTrailer(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 10,
                  color: "#fff",
                  background: "rgba(0,0,0,0.38)",
                  "&:hover": { background: "rgba(0,0,0,0.78)" },
                }}
              >
                <CloseIcon />
              </IconButton>
              {/* Video trailer */}
              <Box
                sx={{
                  width: "100%",
                  pt: "56.25%",
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={movies[0].trailer}
                  title="Trailer"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* === Logos row === */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            py: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {companies.map((c) => {
            if (!c || !c.logo) return null;
            const logoUrl = c.logo.startsWith("http")
              ? c.logo
              : `${window.location.origin}${c.logo}`;
            return (
              <Box
                sx={{
                  flex: "0 0 auto",
                  minWidth: 190,
                  height: 88,
                  p: 1,
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: 4,
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "box-shadow .2s, border .2s",
                  boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                  "&:hover": {
                    borderColor: "#fff",
                  },
                }}
              >
                <img
                  src={logoUrl}
                  alt={c.production_name || c.name}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ==== Cột phải: Sidebar ==== */}
      <Box flex={3} minWidth={320} maxWidth={420} p={0}>
        <RightSidebar />
      </Box>
    </Box>
  );
};

export default HomePage;
