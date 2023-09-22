import { Grid, Box, Avatar, Typography, Divider, Stack } from "@mui/material";
import PostCard from "../components/PostCard";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAnyUserQuery } from "../app/services/userApi";
import { useGetPostsFromUserQuery } from "../app/services/postApi";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const OtherUserProfilePage = () => {
  const navigate = useNavigate();

  const { username } = useParams();
  const loggedInUser = useSelector((state) => state.user.user);
  if (loggedInUser?.username === username) {
    navigate("/profile");
  }

  const { data: userData, isLoading: isUserLoading } =
    useGetAnyUserQuery(username);
  const user = userData?.user;

  const { data: postData, isLoading: isPostLoading } =
    useGetPostsFromUserQuery(username);
  const posts = postData?.posts || [];

  return (
    <>
      {isUserLoading || isPostLoading ? <Loader /> : null}
      <Grid
        container
        spacing={6}
        p={{
          xs: 2,
          md: 4,
        }}
      >
        <Grid item xs={4} md={6}>
          <Box sx={{ p: 2 }}>
            <Avatar
              sx={{ width: 64, height: 64, mb: 2 }}
              src={user?.avatar}
              alt={user?.name}
            />
            <Typography fontWeight="bold" variant="h6">
              @{user?.username}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={6}>
          <Box
            sx={{ p: 2, display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <Typography fontWeight="bold" variant="h5">
              {user?.name}
            </Typography>
            <Typography variant="body1">{user?.email}</Typography>
            <Typography variant="body1">
              Joined: {new Date(user?.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" sx={{ my: 2 }}>
        Your Posts
      </Typography>
      {posts.length === 0 ? (
        <Typography variant="body1" sx={{ my: 2 }}>
          You have not created any posts yet.
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ my: 4 }}>
          {posts.map((post) => (
            <PostCard key={post} data={post} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default OtherUserProfilePage;
