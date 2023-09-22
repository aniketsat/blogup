import * as React from "react";
import { Avatar, Button, TextField, Grid, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { MuiFileInput } from "mui-file-input";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../app/services/userApi";
import Loader from "../components/Loader";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [registerUserMutation, { isLoading }] = useRegisterUserMutation();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password || !passwordConfirm || !avatar) {
      toast.error("Please fill all fields");
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
    }
    if (avatar.type.split("/")[0] !== "image") {
      toast.error("File type not supported");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    registerUserMutation(formData)
      .unwrap()
      .then(() => {
        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
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
            Register
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
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <MuiFileInput
              margin="normal"
              required
              fullWidth
              label="Avatar"
              value={avatar}
              onChange={(file) => setAvatar(file)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <MuiLink
                  component={ReactRouterLink}
                  to="/login"
                  variant="body2"
                >
                  {"Already have an account? Login"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
