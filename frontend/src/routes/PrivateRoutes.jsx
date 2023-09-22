import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
    return () => {};
  }, [navigate, user]);

  return <Outlet />;
};

export default PrivateRoutes;
