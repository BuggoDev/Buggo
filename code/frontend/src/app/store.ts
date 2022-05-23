import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../slices/userSlices";
import searchReducer from "../slices/searchSlice";
import postsReducer from "slices/postsSlice";
import githubReducer from "slices/githubSlice";
import projectReducer from "slices/projectSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    search: searchReducer,
    posts: postsReducer,
    github: githubReducer,
    project: projectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
