import React from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  CardHeader,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../app/services/postApi";
import Loader from "../components/Loader";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../app/services/followApi";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../app/services/commentApi";

import { updateUser } from "../app/features/userSlice";
import { toast } from "react-toastify";

const PostPage = () => {
  const theme = useTheme();

  const { postSlug } = useParams();
  const { data, isLoading } = useGetPostQuery(postSlug);
  const post = data?.post;

  const [followDisabled, setFollowDisabled] = React.useState(false);

  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unfollowLoading }] =
    useUnfollowUserMutation();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleFollow = () => {
    if (!user) return toast.error("Please login to follow the user");
    setFollowDisabled(true);
    if (user?.followings?.includes(post?.user?._id)) {
      unfollowUser(post?.user?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          setFollowDisabled(false);
          dispatch(
            updateUser({
              ...user,
              followings: user?.followings.filter(
                (userId) => userId !== post?.user?._id
              ),
            })
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          setFollowDisabled(false);
        });
    } else {
      followUser(post?.user?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          setFollowDisabled(false);
          dispatch(
            updateUser({
              ...user,
              followings: [...user.followings, post?.user?._id],
            })
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          setFollowDisabled(false);
        });
    }
  };

  const [createComment, { isLoading: createCommentLoading }] =
    useCreateCommentMutation();
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();

  const [comment, setComment] = React.useState("");

  const [allComments, setAllComments] = React.useState(post?.comments);
  React.useEffect(() => {
    setAllComments(post?.comments);
  }, [post?.comments]);

  const handleCreateComment = () => {
    if (!user) return toast.error("Please login to comment on the post");
    createComment({ postId: post?._id, comment })
      .unwrap()
      .then((res) => {
        console.log(res);
        setComment("");
        setAllComments([res.comment, ...allComments]);
        dispatch(
          updateUser({
            ...user,
            comment_count: user?.comment_count + 1,
          })
        );
        toast.success("Comment posted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleDeleteComment = (commentId, userId) => {
    if (!user) return toast.error("Please login to delete the comment");
    if (user?._id !== userId)
      return toast.error("You aren't authorized to delete this comment");
    deleteComment(commentId)
      .unwrap()
      .then((res) => {
        console.log(res);
        setAllComments(allComments.filter((c) => c._id !== commentId));
        dispatch(
          updateUser({
            ...user,
            comment_count: user?.comment_count - 1,
          })
        );
        toast.success("Comment deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      {isLoading ||
      followLoading ||
      unfollowLoading ||
      createCommentLoading ||
      deleteCommentLoading ? (
        <Loader />
      ) : null}
      <Stack direction="column" spacing={4}>
        <Box sx={{ width: "100%", pt: 4 }}>
          <img
            src={post?.cover}
            alt={post?.title}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          />
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={post?.user?.avatar}
              >
                {post?.user?.name[0]}
              </Avatar>
            }
            action={
              <>
                {user?._id === post?.user?._id ? null : (
                  <Button
                    variant="text"
                    size="small"
                    disabled={followDisabled}
                    onClick={handleFollow}
                  >
                    {user
                      ? user?.followings?.includes(post?.user?._id)
                        ? "Unfollow"
                        : "Follow"
                      : "Follow"}
                  </Button>
                )}
              </>
            }
            title={post?.user?.name}
            subheader={"Posted on " + new Date(post?.createdAt).toDateString()}
          />
        </Box>

        <Box sx={{ width: "100%", padding: "0 8px" }}>
          <Stack spacing={2}>
            <Typography variant="h4">{post?.title}</Typography>
            <div
              data-color-mode={theme.palette.mode === "dark" ? "dark" : "light"}
            >
              <MarkdownEditor.Markdown
                toolbar={false}
                style={{}}
                source={post?.body}
              ></MarkdownEditor.Markdown>
            </div>
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ width: "100%" }} id="comment">
          <Typography variant="h5">Comments</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              mt: 2,
            }}
          >
            <TextField
              placeholder="Add a comment"
              fullWidth
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              sx={{ height: "56px", padding: "0 24px" }}
              onClick={handleCreateComment}
            >
              Post
            </Button>
          </Box>

          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            title="Comments"
          >
            {allComments?.map((c) => (
              <ListItem
                alignItems="flex-start"
                key={c._id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(c._id, c.user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={c?.user?.name[0]} src={c?.user?.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={c?.user?.name}
                  secondary={<React.Fragment>{c?.comment}</React.Fragment>}
                />
              </ListItem>
            ))}
            <Divider variant="inset" component="li" />
          </List>
        </Box>
      </Stack>
    </>
  );
};

export default PostPage;
