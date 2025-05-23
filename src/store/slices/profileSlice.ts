import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getProfile = createAsyncThunk(
  "profile/view",
  async (_, thunkAPI) => {
    try {
      const result = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("failed to fetch profile" + error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: null,
  reducers: {
    addUser: (_, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(getProfile.rejected, () => {
        return null;
      });
  },
});

export const { addUser, removeUser } = profileSlice.actions;

export default profileSlice.reducer;
