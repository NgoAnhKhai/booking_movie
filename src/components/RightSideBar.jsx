import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  Stack,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { GetPopularMovies } from "../services/GetPopularMovies";
import { getAllGenres } from "../services/GetAllGenres";

const RightSidebar = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch top movies
        const moviesRes = await GetPopularMovies();
        setTopMovies(moviesRes.data || []);
        // Fetch genres
        const genresRes = await getAllGenres();
        setGenres(genresRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setTopMovies([]);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: 340, px: 2, pt: 3 }}>
      {/* Top Movies */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Top Movies
      </Typography>
      <Stack spacing={2} mb={3}>
        {(loading
          ? Array.from({ length: 3 })
          : showAll
          ? topMovies
          : topMovies.slice(0, 3)
        ).map((movie, idx) =>
          loading ? (
            <Box key={idx} display="flex" alignItems="center" gap={2}>
              <Skeleton variant="rectangular" width={54} height={80} />
              <Box flex={1}>
                <Skeleton width="60%" />
                <Skeleton width="30%" />
                <Skeleton width="40%" />
              </Box>
            </Box>
          ) : (
            <Box key={movie.name} display="flex" alignItems="center" gap={2}>
              <Avatar
                variant="rounded"
                src={movie.image_vertical}
                alt={movie.title}
                sx={{ width: 54, height: 80, borderRadius: 2, boxShadow: 1 }}
              />
              <Box flex={1} minWidth={0}>
                <Typography
                  variant="subtitle2"
                  color="#fff"
                  fontWeight={600}
                  noWrap
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{
                    bgcolor: "#191924",
                    px: 1,
                    borderRadius: 1,
                    fontSize: "10px",
                    display: "inline-block",
                    mt: 0.5,
                  }}
                >
                  {movie.age_rating || "PG-13"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                  noWrap
                >
                  {movie.genres?.join(" • ") || ""}
                </Typography>
                <Box display="flex" alignItems="flex-start" gap={0.5} mt={0.5}>
                  <StarIcon
                    sx={{ color: "#FFD700", fontSize: 18, mt: "1px" }}
                  />
                  <Typography
                    variant="caption"
                    color="#fff"
                    fontWeight={700}
                    sx={{ fontSize: 15, lineHeight: 1.6 }}
                  >
                    {movie.avg_rating
                      ? Number(movie.avg_rating).toFixed(1)
                      : "0.0"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        )}
      </Stack>
      {/* See All button */}
      {topMovies.length > 3 && (
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 6,
            borderColor: "#A363F8",
            color: "#A363F8",
            mb: 4,
            py: 1,
            fontWeight: 700,
            fontSize: 18,
            "&:hover": { borderColor: "#C77DFF", color: "#C77DFF" },
          }}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less" : "See All"}
        </Button>
      )}

      {/* Genres */}
      <Typography variant="h6" fontWeight={700} mb={1}>
        Favorites Genres
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {(loading ? Array.from({ length: 8 }) : genres).map((genre, idx) =>
          loading ? (
            <Skeleton variant="rounded" width={60} height={30} key={idx} />
          ) : (
            <Chip
              key={genre.name || genre}
              label={genre.name || genre}
              sx={{
                bgcolor: "#191924",
                color: "#fff",
                borderRadius: 12,
                px: 2,
                fontWeight: 600,
                fontSize: 15,
                border: "none",
              }}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default RightSidebar;
