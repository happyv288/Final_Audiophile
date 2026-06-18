import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeadphonesPage from "./pages/HeadphonesPage";
import SpeakersPage from "./pages/SpeakersPage";
import EarphonesPage from "./pages/EarphonesPage";
import ProductDetailsPage from "./pages/ProdultDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ProfilePage from "./pages/ProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdmnUsers";
import AdminLayout from "./pages/admin/AdminLayout";
import RootLayout from "./layouts/RootLayouts";
import NotFoundPage from "./pages/NotFoundPage";
import AdminRouter from "./components/AdminRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/headphones" element={<HeadphonesPage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/earphones" element={<EarphonesPage />} />
            <Route path="/product" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/t&c" element={<TermsAndConditionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<AdminRouter />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>

          <Route path="" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
