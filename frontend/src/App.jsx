import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import LuziPage from "./components/pages/Brands/Luzi";
import GivaudanPage from "./components/pages/Brands/Givaudan";
import SeluzPage from "./components/pages/Brands/Seluz";
import SymrisePage from "./components/pages/Brands/Symrise";
import ResetPassword from './components/pages/ResetPassword';
import ProductsPage from "./components/pages/ProductsPage";
import BuyNowCheckout from "./components/pages/BuyNowCheckout";
import IberchemPage from "./components/pages/Brands/Iberchem";
import OrderSuccess from "./components/pages/OrderSuccess";
import HowToOrder from "./components/pages/HowToOrder";
import ConfirmEmail from "./components/pages/ConfirmEmail";

import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer, Flip } from "react-toastify";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDispatch, useSelector } from "react-redux";
import { setUser, setVerification } from "./storage/userSlice";
import { setAccessToken } from "./storage/authSlice";
import { useEffect, useState } from "react";
import { refreshUserInfo } from './api/refreshUserInfo';
import MainLoading from "./components/MainLoading";

const client = new QueryClient();

function App() {
  const accessToken = useSelector(state => state.auth?.accessToken);
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.data);
  const isVerified = user && useSelector(state => state.user?.isVerified);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    

    const verifyLogin = async () => {

      setIsLoading(true);

      if (!accessToken || !isVerified) {
        try {
          const res = await refreshUserInfo();
          dispatch(setUser(res.userData));
          dispatch(setAccessToken(res.accessToken));
          
          if (res.userData && res.userData.isVerified !== 'undefined') {
            dispatch(setVerification(res.userData.isVerified))
          }

        } catch (error) {
          console.log(error);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500)
      
    };

    verifyLogin();
    

  }, [accessToken, dispatch]);

  return (
    <QueryClientProvider client={client}>
      {isLoading ? <MainLoading/> :
      <Router>
        <ScrollToTop />
        <ToastContainer
          hideProgressBar
          transition={Flip}
          position="top-right"
          autoClose={3000}
          toastClassName="toasts"
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Layout-Wrapped Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/how-to-order" element={<HowToOrder />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/luzi" element={<LuziPage />} />
            <Route path="/givaudan" element={<GivaudanPage />} />
            <Route path="/seluz" element={<SeluzPage />} />
            <Route path="/iberchem" element={<IberchemPage />} />
            <Route path="/symrise" element={<SymrisePage />} />

            {/* Protected */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/buy-now" element={<BuyNowCheckout/>}/>
              <Route path="/order-success" element={<OrderSuccess />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />}/>
          </Route>
        </Routes>
      </Router>}
    </QueryClientProvider>
  );
}

export default App;
