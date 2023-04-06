import { configureStore, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

type UserState = {
  user: User | null | string;
};

const intiialState: UserState = {
  user: window?.localStorage?.getItem("user"),
};

const appSlice = createSlice({
  name: "app",
  initialState: intiialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

const store = configureStore({
  reducer: appSlice.reducer,
});

export const { loginUser, logoutUser } = appSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
