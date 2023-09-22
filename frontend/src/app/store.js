import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import userSlice from "./features/userSlice";
import postSlice from "./features/postSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
