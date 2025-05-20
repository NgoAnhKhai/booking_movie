import { Box } from "@mui/material";
import MovieCarousel from "../components/SplitHomePage/MovieCarousel";
import MovieTabs from "../components/MovieTabs/MovieTabs";
const HomePage = () => (
  <Box>
    <MovieCarousel />
    <MovieTabs />
  </Box>
);

export default HomePage;
