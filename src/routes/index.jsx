import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ResetPassword from "../pages/reset passwod/ResetPassword";
import VerifyAccount from "../pages/reset passwod/VerifyAccount";
import CreateNewPassword from "../pages/reset passwod/CreateNewPassword";
const Router = () => {
  return (
    <Routes>
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/reset" element={<ResetPassword />} />
      <Route path="/auth/create" element={<CreateNewPassword />} />
      <Route path="/auth/reset/verify" element={<VerifyAccount />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
