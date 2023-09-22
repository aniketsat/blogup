import { apiSlice } from "../features/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      invalidatesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (slug) => `/posts/${slug}`,
      invalidatesTags: ["Post"],
    }),
    getPostsFromUser: builder.query({
      query: (username) => `/posts/user/${username}`,
      invalidatesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    getPostsFromLoggedInUser: builder.query({
      query: () => "/posts/me",
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostsFromUserQuery,
  useCreatePostMutation,
  useGetPostsFromLoggedInUserQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
