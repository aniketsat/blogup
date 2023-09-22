/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Loader from "../components/Loader";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../app/services/likeApi";
import { useSaveMutation, useUnsaveMutation } from "../app/services/saveApi";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../app/services/followApi";
import { updatePost } from "../app/features/postSlice";
import { updateUser } from "../app/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PostCard({ data }) {
  const theme = useTheme();

  const navigate = useNavigate();

  const [likeDisabled, setLikeDisabled] = React.useState(false);
  const [saveDisabled, setSaveDisabled] = React.useState(false);
  const [followDisabled, setFollowDisabled] = React.useState(false);

  const [likePost, { isLoading: likeLoading }] = useLikePostMutation();
  const [unlikePost, { isLoading: unlikeLoading }] = useUnlikePostMutation();

  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unfollowLoading }] =
    useUnfollowUserMutation();

  const [savePost, { isLoading: saveLoading }] = useSaveMutation();
  const [unsavePost, { isLoading: unsaveLoading }] = useUnsaveMutation();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (
      likeLoading ||
      unlikeLoading ||
      saveLoading ||
      unsaveLoading ||
      followLoading ||
      unfollowLoading
    ) {
      setLikeDisabled(true);
      setSaveDisabled(true);
      setFollowDisabled(true);
    } else {
      setLikeDisabled(false);
      setSaveDisabled(false);
      setFollowDisabled(false);
    }
  }, [
    likeLoading,
    unlikeLoading,
    saveLoading,
    unsaveLoading,
    followLoading,
    unfollowLoading,
  ]);

  const handleLike = () => {
    if (!user) return toast.error("Please login to like the post");
    setLikeDisabled(true);
    console.log(data.liked_users);
    if (data?.liked_users?.some((user) => user._id === user?._id)) {
      unlikePost(data?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(
            updatePost({
              ...data,
              like_count: data?.like_count - 1,
              liked_users: data?.liked_users.filter(
                (user) => user._id !== user?._id
              ),
            })
          );
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          setLikeDisabled(false);
        });
    } else {
      likePost(data?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(
            updatePost({
              ...data,
              like_count: data?.like_count + 1,
              liked_users: [...data.liked_users, user],
            })
          );
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          setLikeDisabled(false);
        });
    }
  };

  const handleSave = () => {
    if (!user) return toast.error("Please login to save the post");
    setSaveDisabled(true);
    if (data?.saved_users?.some((user) => user._id === user?._id)) {
      unsavePost(data?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(
            updatePost({
              ...data,
              saved_users: data?.saved_users.filter(
                (user) => user._id !== user?._id
              ),
            })
          );
          setSaveDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          setSaveDisabled(false);
        });
    } else {
      savePost(data?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(
            updatePost({
              ...data,
              saved_users: [...data.saved_users, user],
            })
          );
          setSaveDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          setSaveDisabled(false);
        });
    }
  };

  const handleFollow = () => {
    if (!user) return toast.error("Please login to follow the user");
    setFollowDisabled(true);
    if (user?.followings?.includes(data?.user?._id)) {
      unfollowUser(data?.user?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          setFollowDisabled(false);
          dispatch(
            updateUser({
              ...user,
              followings: user?.followings.filter(
                (userId) => userId !== data?.user?._id
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
      followUser(data?.user?._id)
        .unwrap()
        .then((res) => {
          console.log(res);
          setFollowDisabled(false);
          dispatch(
            updateUser({
              ...user,
              followings: [...user.followings, data?.user?._id],
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

  const moveToComment = () => {
    navigate(`/post/${data?.slug}`);
    document.getElementById("comment").scrollIntoView();
  };

  return (
    <>
      {likeLoading ||
      unlikeLoading ||
      saveLoading ||
      unsaveLoading ||
      followLoading ||
      unfollowLoading ? (
        <Loader />
      ) : null}
      <Card sx={{}}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], cursor: "pointer" }}
              aria-label="recipe"
              src={data?.user?.avatar}
              onClick={() => {
                navigate(`/user/${data?.user?.username}`);
              }}
            >
              {data?.user?.name[0]}
            </Avatar>
          }
          action={
            <>
              {user?._id === data?.user?._id ? null : (
                <Button
                  variant="text"
                  size="small"
                  disabled={followDisabled}
                  onClick={handleFollow}
                >
                  {user
                    ? user?.followings?.includes(data?.user?._id)
                      ? "Unfollow"
                      : "Follow"
                    : "Follow"}
                </Button>
              )}
            </>
          }
          title={data?.user?.name}
          subheader={new Date(data?.createdAt).toISOString().slice(0, 10)}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <CardMedia
                component="img"
                height="194"
                image={data?.cover}
                alt={data?.title}
                sx={{ borderRadius: "4px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <Typography
                variant="h4"
                color="text.primary"
                component={RouterLink}
                to={`/post/${data?.slug}`}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {data?.title}
              </Typography>
              <div
                data-color-mode={
                  theme.palette.mode === "dark" ? "dark" : "light"
                }
              >
                <MarkdownEditor.Markdown
                  toolbar={false}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                  }}
                  source={data?.body}
                ></MarkdownEditor.Markdown>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justifyContent={"space-between"}>
            <Grid item sx={{ display: "flex", gap: 1.5 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  aria-label="add to favorites"
                  disabled={likeDisabled}
                  onClick={handleLike}
                >
                  {user ? (
                    <FavoriteIcon
                      style={{
                        color: data?.liked_users?.some(
                          (user) => user._id === user?._id
                        )
                          ? "red"
                          : theme.palette.text.primary,
                      }}
                    />
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
                {data?.like_count}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton aria-label="comment" onClick={moveToComment}>
                  <CommentIcon />
                </IconButton>
                {data?.comment_count}
              </div>
              {/* <div>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div> */}
            </Grid>
            <Grid item>
              <IconButton
                aria-label="bookmark"
                disabled={saveDisabled}
                onClick={handleSave}
              >
                {user ? (
                  <>
                    {data?.saved_users?.some(
                      (user) => user._id === user?._id
                    ) ? (
                      <BookmarkAddedIcon />
                    ) : (
                      <BookmarkAddIcon />
                    )}
                  </>
                ) : (
                  <BookmarkAddIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}
