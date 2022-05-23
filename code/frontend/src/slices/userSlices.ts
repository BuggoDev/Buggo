import { RootState } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account, Comment, Post } from "../resources/commonTypes";

type UserSlice = {
  currentUser: Account;
  postList: Post[];
  commentList: Comment[];
  profileModalVisible: boolean;
  isOnMobile: boolean;
};

const initialState: UserSlice = {
  currentUser: {
    email: "noUser",
    post_ids: [],
    comment_ids: [],
    project_ids: [],
  },
  postList: [],
  commentList: [],
  profileModalVisible: false,
  isOnMobile: false,
};

// Updates all Account info from database.
function userUpdate(state: any, action: PayloadAction<Account>) {
  state.currentUser = action.payload;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: userUpdate,
    updatePostList: (state, action: PayloadAction<Post[]>) => {
      state.postList = [...action.payload];
    },
    updateCommentList: (state, action: PayloadAction<Comment[]>) => {
      state.commentList = [...action.payload];
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.currentUser.email = action.payload;
    },
    toggleProfileModal: (state, action: PayloadAction<boolean>) => {
      state.profileModalVisible = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = initialState.currentUser;
      state.commentList = initialState.commentList;
      state.postList = initialState.postList;
    },
    updateIsOnMobile: (state, action: PayloadAction<boolean>) => {
      state.isOnMobile = action.payload;
    },
  },
});

export const {
  updateUser,
  updateCommentList,
  updateUserEmail,
  updatePostList,
  resetUser,
  toggleProfileModal,
  updateIsOnMobile,
} = userSlice.actions;

// state not sure
export const isSignedIn = (state: RootState) =>
  state.user.currentUser.email !== "noUser";
export const selectUser = (state: RootState) => state.user.currentUser;
export const selectPostList = (state: RootState) => state.user.postList;
export const selectCommentList = (state: RootState) => state.user.commentList;
export const selectIsOnMobile = (state: RootState) => state.user.isOnMobile;

export default userSlice.reducer;
