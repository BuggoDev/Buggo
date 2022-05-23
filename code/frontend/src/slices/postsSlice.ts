import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Post, Project } from "resources/commonTypes";

type PostsSliceState = {
  entities: Post[];
  displaying: number; // index of the post being displayed on the right
  isNewRequest: boolean; //helps decide if should display a new post
  currentProject: Project; //id of project currently on
  postClicked: boolean; //helps decide if post was clicked on mobile
};

const initialState: PostsSliceState = {
  entities: [],
  displaying: 0,
  isNewRequest: false,
  currentProject: { id: "", developers: [], name: "", urlLogo: "" },
  postClicked: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.entities = [...action.payload].reverse();
      state.displaying = 0;
    },
    updateDisplayingPostIndex: (state, action: PayloadAction<number>) => {
      state.displaying = action.payload;
    },
    updateDisplayingPost: (state, action: PayloadAction<Post>) => {
      const displayed: number = state.displaying;
      state.entities = [
        ...state.entities.slice(0, displayed),
        action.payload,
        ...state.entities.slice(displayed + 1),
      ];
    },
    setNewRequest: (state: any, action: PayloadAction<boolean>) => {
      state.isNewRequest = action.payload;
    },
    updateCurrentProject: (state: any, action: PayloadAction<string>) => {
      state.currentProject = action.payload;
    },
    updatePostClicked: (state: any, action: PayloadAction<boolean>) => {
      state.postClicked = action.payload;
    },
  },
});

export const {
  updatePosts,
  updateDisplayingPostIndex,
  setNewRequest,
  updateDisplayingPost,
  updateCurrentProject,
  updatePostClicked,
} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.entities;

export const selectDisplayPostIndex = (state: RootState) =>
  state.posts.displaying;

export const selectDisplayPost = (state: RootState) =>
  state.posts.entities[state.posts.displaying];

export const selectNewRequest = (state: RootState) => state.posts.isNewRequest;

export const selectCurrentProject = (state: RootState) =>
  state.posts.currentProject;

export const selectPostClicked = (state: RootState) => state.posts.postClicked;

export default postsSlice.reducer;
