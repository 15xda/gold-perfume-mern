import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const user = useSelector(state => state.user?.data);
  const location = useLocation();


  if (!user) {
    
    if (location.pathname !== "/login") {
      return (
        <Navigate 
          to="/login"
          state={{ from: location.pathname }}
          replace
        />
      );
    }

    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
