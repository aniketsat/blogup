import { apiSlice } from "../features/apiSlice";

export const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (id) => ({
        url: `follows/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Follow"],
    }),
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `follows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Follow"],
    }),
    getFollowers: builder.query({
      query: () => "follows/followers",
      invalidatesTags: ["Follow"],
    }),
    getFollowings: builder.query({
      query: () => "follows/followings",
      invalidatesTags: ["Follow"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingsQuery,
} = followApi;
