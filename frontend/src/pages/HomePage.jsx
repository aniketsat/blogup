import { Container, Stack } from "@mui/material";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const posts = useSelector((state) => state.post.posts);

  return (
    <>
      <Container fluid maxWidth="xl">
        <Stack spacing={2} sx={{ my: 4 }}>
          {posts.map((post) => (
            <PostCard key={post._id} data={post} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
