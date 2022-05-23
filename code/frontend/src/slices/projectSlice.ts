import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Project } from "resources/commonTypes";

interface ProjectSliceState {
  current: Project | null;
  isUserDeveloper: boolean;
}

const initialState: ProjectSliceState = {
  current: null,
  isUserDeveloper: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.current = action.payload;
    },
    setDeveloperStatus: (state, action: PayloadAction<boolean>) => {
      state.isUserDeveloper = action.payload;
    },
  },
});

export const { setCurrentProject, setDeveloperStatus } = projectSlice.actions;
export const selectIsUserDeveloper = (state: RootState) =>
  state.project.isUserDeveloper;
export default projectSlice.reducer;
