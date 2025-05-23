import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/profileSlice";
import feedSlice from "./slices/feedSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    feed: feedSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
