import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const uid = Cookies.get("uid");
  if (uid) return children;
  else return <Navigate to="/login" />;
};

export default RouteGuard;