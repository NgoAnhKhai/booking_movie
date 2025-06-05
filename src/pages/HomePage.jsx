import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getListMovie } from "../services/GetListMovie";
import Loader from "../components/load/loading";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies data from the MovieDB API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getListMovie(1);
        console.log("response ", response);

        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setLoading(false); // Stop loading if error occurs
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <Typography variant="h6" color="white">
        <Loader />
      </Typography>
    );
  }

  return (
    <Box sx={{ bgcolor: "#1A161F", color: "white", padding: "20px" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          CineMax
        </Typography>
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Typography variant="body1">Movies</Typography>
          <Typography variant="body1">Series</Typography>
          <Typography variant="body1">Animation</Typography>
          <Typography variant="body1">Genres</Typography>
        </Box>
      </Box>

      {/* Movie Banner (First Movie) */}
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ maxWidth: "50%" }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {movies[0]?.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            {movies[0]?.release_date} · {movies[0]?.genres?.join(", ")}
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#9B41F7", color: "white" }}
          >
            Watch Now
          </Button>
        </Box>
        <Box>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies[0]?.poster_path}`}
            alt={movies[0]?.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>
      </Box>

      {/* Top Movies */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Top Movies
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {movies.slice(1, 6).map((movie) => (
            <Grid item xs={4} key={movie.id}>
              <Card sx={{ bgcolor: "#2E2A32", borderRadius: "8px" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2">
                    {movie.vote_average} ⭐
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Continue Watching (dummy content) */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Continue Watching
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {/* Replace this with real data when available */}
          <Grid item xs={6}>
            <Card sx={{ bgcolor: "#2E2A32", borderRadius: "8px" }}>
              <CardMedia
                component="img"
                height="150"
                image={`https://image.tmdb.org/t/p/w500/${movies[1]?.poster_path}`}
                alt={movies[1]?.title}
              />
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {movies[1]?.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Genres */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Favorites Genres
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Action
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Fantasy
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Comedy
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Sci-Fi
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Drama
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Romance
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Mystery
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "#9B41F7" }}
          >
            Horror
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
