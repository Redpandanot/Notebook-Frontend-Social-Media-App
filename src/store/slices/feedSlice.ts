import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../Types/type";

interface FeedState {
  posts: Post[]; // <--- The feed state is an array of Post objects
  // Add other state properties here if needed
  // loading: boolean; error: string | null;
}

// Define the initial state using that type
const initialState: FeedState = {
  posts: [], // <--- Initial state is an empty array of Posts
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    // updatePosts: (state,action: PayloadAction<Post[]>) =>{
    //   // state.posts = {...state, action.payload}
    // }
  },
});

export const { addPosts } = feedSlice.actions;

export default feedSlice.reducer;
