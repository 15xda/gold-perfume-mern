import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from './AnimatedRoutes';
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer, Flip } from "react-toastify";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./storage/userSlice";
import { setAccessToken } from "./storage/authSlice";
import { useEffect } from "react";
import { refreshUserInfo } from './api/refreshUserInfo';

const client = new QueryClient();

function App() {
  const accessToken = useSelector(state => state.auth?.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyLogin = async () => {
      if (!accessToken) {
        try {
          const res = await refreshUserInfo();
          dispatch(setUser(res.userData));
          dispatch(setAccessToken(res.accessToken));
        } catch (error) {
          console.log(error);
        }
      }
    };

    verifyLogin();
  }, [accessToken, dispatch]);

  return (
    <QueryClientProvider client={client}>
      <Router>
        <ScrollToTop />
        <ToastContainer
          hideProgressBar
          transition={Flip}
          position="top-right"
          autoClose={3000}
          toastClassName="toasts"
        />
        <AnimatedRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
