import { apiSlice } from "../features/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: () => "/users/profile",
      invalidatesTags: ["User"],
    }),
    getAnyUser: builder.query({
      query: (username) => `/users/userprofile/${username}`,
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useGetAnyUserQuery,
} = userApi;
