import { apiSlice } from "../features/apiSlice";

export const likeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation({
      query: (postId) => ({
        url: `likes/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Like"],
    }),
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `likes/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Like"],
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;
