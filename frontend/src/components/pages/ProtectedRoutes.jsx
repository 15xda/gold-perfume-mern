import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const user = useSelector(state => state.user?.data)
  
  return user ? <Outlet /> : <Navigate to='/login'/>
}

export default ProtectedRoutes