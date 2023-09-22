import * as React from "react";
import { Avatar, Button, TextField, Grid, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../app/services/userApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../app/features/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loginUserMutation, { isLoading }] = useLoginUserMutation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
    }

    loginUserMutation({ email, password })
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(loginUser(data?.user));
        toast.success("Login successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        dispatch(logoutUser());
        toast.error(err.data.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <MuiLink
                  component={ReactRouterLink}
                  to="/register"
                  variant="body2"
                >
                  {"Don't have an account? Register"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
