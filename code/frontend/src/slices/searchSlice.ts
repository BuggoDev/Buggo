import { RootState } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType, PostStatus } from "../resources/commonTypes";

type FilterObj = {
  postType: PostType | null;
  postStatus: PostStatus | null;
};

type searchStates = {
  searching: boolean;
  filters: FilterObj;
  placeholder: boolean;
  // searchStack:{} //TODO: Implement this
};

const initialState: searchStates = {
  searching: false,
  filters: {
    postType: null,
    postStatus: null,
  },
  placeholder: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchStatus: (state: any, action: PayloadAction<boolean>) => {
      state.searching = action.payload;
    },

    clearSearch: (state: any) => {
      state.searching = false;
      state.filters = initialState.filters;
    },

    // TODO: implement search filters 
    // updateSearchFilters: (
    //     state: any,
    //     action: PayloadAction<{filter: PostType}>
    // )
  },
});

export const { updateSearchStatus, clearSearch } = searchSlice.actions; 

export const selectPlaceholder = (state: RootState) => state.search.placeholder;
export const selectSearchStatus = (state: RootState) => state.search.searching;
export const selectFilters = (state: RootState) => state.search.filters;

export default searchSlice.reducer;
