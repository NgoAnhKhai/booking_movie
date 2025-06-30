import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const RecommendationSidebar = ({ recommendations = [] }) => (
  <Box
    sx={{
      width: 330,

      p: 2,
      height: "100vh",
      overflowY: "auto",
      borderLeft: "1.5px solid #24243a",
    }}
  >
    <Typography variant="h6" fontWeight={700} mb={2} color="#fff">
      Recommendation
    </Typography>
    {recommendations.map((movie) => (
      <Card
        key={movie.id}
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          background: "#232335",
          color: "#fff",
          borderRadius: 3,
          cursor: "pointer",
          boxShadow: "0 2px 12px 0 #0004",
          "&:hover": { background: "#29294a" },
        }}
      >
        <CardMedia
          component="img"
          image={movie.image}
          alt={movie.title}
          sx={{ width: 80, height: 60, borderRadius: 2, objectFit: "cover" }}
        />
        <CardContent sx={{ pl: 2, pr: 1 }}>
          <Typography fontWeight={700} fontSize={15} noWrap>
            {movie.title}
          </Typography>
          <Typography color="#ffec74" fontSize={14} fontWeight={600}>
            ★ {movie.rating}
          </Typography>
          <Typography fontSize={12} color="#b7b8c8">
            {movie.genre}
          </Typography>
        </CardContent>
      </Card>
    ))}
    <Typography
      mt={2}
      textAlign="right"
      sx={{
        color: "#B43FEB",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 15,
      }}
    >
      See All
    </Typography>
  </Box>
);

export default RecommendationSidebar;
