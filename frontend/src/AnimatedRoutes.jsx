// AnimatedRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from './components/pages/Home';
import Layout from './components/pages/Layout';
import ProductDetails from './components/pages/ProductDetails';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Favorites from './components/pages/Favorites';
import Cart from './components/pages/Cart';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import NotFound from './components/pages/NotFound';
import Dashboard from './components/pages/Dashboard';
import SearchResult from './components/pages/SearchResult';
import ProtectedRoutes from "./components/pages/ProtectedRoutes";
import Checkout from "./components/pages/Checkout";
import LuziPage from "./components/pages/Luzi";
import GivaudanPage from "./components/pages/Givaudan";
import ResetPassword from './components/pages/ResetPassword';
import ProductsPage from "./components/pages/ProductsPage";

const AnimatedRoutes = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Layout-Wrapped Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brand/luzi" element={<LuziPage />} />
          <Route path="/brand/Givaudan" element={<GivaudanPage />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
