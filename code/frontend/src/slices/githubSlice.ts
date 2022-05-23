import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

type githubSliceState = {
  repositories: any[]; //List of all repos from a user
};

const initialState: githubSliceState = {
  repositories: [],
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    updateRepositories: (state, action: PayloadAction<any[]>) => {
      state.repositories = [...action.payload];
    },
  },
});

export const { updateRepositories } = githubSlice.actions;

export const selectRepositories = (state: RootState) =>
  state.github.repositories;

export default githubSlice.reducer;
