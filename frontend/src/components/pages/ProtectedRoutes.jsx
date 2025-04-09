import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const accessToken = useSelector(state => state.auth.accessToken)
  
  return accessToken ? <Outlet /> : <Navigate to='/login'/>
}

export default ProtectedRoutes