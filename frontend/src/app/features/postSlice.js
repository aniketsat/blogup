import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
  },
});

// get all posts from the state
export const selectPosts = (state) => state.post.posts;

export const { getPosts, createPost, updatePost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
