import { apiSlice } from "../features/apiSlice";

export const saveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    save: builder.mutation({
      query: (postId) => ({
        url: `saves/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Save"],
    }),
    unsave: builder.mutation({
      query: (postId) => ({
        url: `saves/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Save"],
    }),
    getSavedPosts: builder.query({
      query: () => "saves",
      invalidatesTags: ["Save"],
    }),
  }),
});

export const { useSaveMutation, useUnsaveMutation, useGetSavedPostsQuery } =
  saveApi;
