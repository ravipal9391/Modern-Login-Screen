import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = localStorage.getItem("isLoggedIn");
  console.log(auth);

  return auth === "true" ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
