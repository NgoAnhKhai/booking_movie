import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import DetailBookingCentral from "../pages/booking/detail/DetailBookingCentral";
import DetailBookingNorth from "../pages/booking/detail/DetailBookingNorth";
import DetailBookingSouth from "../pages/booking/detail/DetailBookingSouth";
import DetailMoviePage from "../pages/DetailMoviePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
const Router = () => {
  return (
    <Routes>

        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/booking/north/:id" element={<DetailBookingNorth />} />
        <Route path="/booking/south/:id" element={<DetailBookingSouth />} />
        <Route path="/movies/:id" element={<DetailMoviePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
