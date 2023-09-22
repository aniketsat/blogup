import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.user._id));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("userId");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
