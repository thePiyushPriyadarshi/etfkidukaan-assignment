import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const OpenRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
};

export default OpenRoute;
