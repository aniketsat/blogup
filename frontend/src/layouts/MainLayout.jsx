/* eslint-disable react/prop-types */
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../app/services/userApi";
import { useGetPostsQuery } from "../app/services/postApi";
import { loginUser, logoutUser } from "../app/features/userSlice";
import { getPosts } from "../app/features/postSlice";
import Loader from "../components/Loader";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  const { data: userData, isLoading: isUserLoading } = useGetUserQuery();
  const { data: postData, isLoading: isPostLoading } = useGetPostsQuery();

  React.useEffect(() => {
    if (userData) {
      dispatch(loginUser(userData?.user));
    } else {
      dispatch(logoutUser());
    }
  }, [dispatch, userData]);

  React.useEffect(() => {
    if (postData) {
      dispatch(getPosts(postData?.posts));
    }
  }, [dispatch, postData]);

  const [themeMode, setThemeMode] = React.useState("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const toggleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        {(isUserLoading || isPostLoading) && <Loader />}
        <Header toggleTheme={toggleTheme} />
        <Container maxWidth="md">{children}</Container>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
