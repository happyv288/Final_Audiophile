// import "./App.css";

// The root component that sets up routing and global providers.
// "Providers" wrap the app so all child components can access shared data (like the cart or the logged-in user).
// React Router handles navigation - it changes what page renders based on the URL, with full page reloads (SPA behavior).

import  { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------- Route wrappers -----------
import RootLayouts from "./layouts/RootLayouts";
import AdminRouter from "./components/AdminRouter";
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";
import RollerLoader from "./components/RollerLoader";

// ----- lazy loading ------- const  = lazy (() => import());

const HomePage = lazy(() => import("./pages/HomePage"));
const HeadphonesPage = lazy(() => import("./pages/HeadphonesPage"));
const SPeakersPage = lazy(() => import("./pages/SpeakersPage"));
const EarphonesPage = lazy(() => import("./pages/EarphonesPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProdultDetailsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage"),
);
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

// Admin pages - only loaded if user is an admin
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/admin/AdmnUsers"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));

function App() {
  return (
    <>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#ffffff",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "14px",
                },

                success: {
                  iconTheme: {
                    primary: "#d87d4a",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
            <Suspense fallback={<RollerLoader />}>
              <Routes>
                <Route element={<RootLayouts />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/headphones" element={<HeadphonesPage />} />
                  <Route path="/speakers" element={<SPeakersPage />} />
                  <Route path="/earphones" element={<EarphonesPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
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

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </>
  );
}

// https://audiophilefinale.vercel.app/
// https://final-audiophile-8wjw.onrender.com
export default App;
