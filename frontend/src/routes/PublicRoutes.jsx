import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoutes = () => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      user &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/register")
    ) {
      navigate("/");
    }
    return () => {};
  }, [navigate, user]);

  return <Outlet />;
};

export default PublicRoutes;
