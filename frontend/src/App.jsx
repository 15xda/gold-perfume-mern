import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
import { ToastContainer, Flip } from "react-toastify";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./storage/userSlice";
import { setAccessToken } from "./storage/authSlice";
import { useEffect, useState } from "react";
import { refreshUserInfo } from './api/refreshUserInfo';
import ProtectedRoutes from "./components/pages/ProtectedRoutes";
import Checkout from "./components/pages/Checkout";
import LuziPage from "./components/pages/Luzi";
import GivaudanPage from "./components/pages/Givaudan";
import ScrollToTop from "./components/ScrollToTop";
import ResetPassword from './components/pages/ResetPassword';
import ProductsPage from "./components/pages/ProductsPage";

const client = new QueryClient();

function App() {
  
  const accessToken = useSelector(state => state.auth?.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyLogin = async () => {
      if (!accessToken) {
        try {
          const res = await refreshUserInfo();
          dispatch(setUser(res.userData))
          dispatch(setAccessToken(res.accessToken))
        } catch (error) {
          console.log(error)
        }
      }
    };
    
    verifyLogin();
  }, [accessToken, dispatch]);



  return (
    <QueryClientProvider client={client}>
      
        <Router>
          <ScrollToTop />
            <ToastContainer hideProgressBar transition={Flip} position="top-right" autoClose={3000} toastClassName='toasts' />

            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Routes Wrapped in Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/product" element={<ProductDetails />} />
                <Route path="/products" element={<ProductsPage />}/>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/brand/luzi" element={<LuziPage />} />
                <Route path="/brand/Givaudan" element={<GivaudanPage />} />

                <Route path="*" element={<NotFound />} />
                
                <Route element={<ProtectedRoutes/>}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>

              </Route>
            </Routes>
            
        </Router>
      
      
    </QueryClientProvider>
  );
}

export default App
