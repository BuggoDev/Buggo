import MDEditor from "@uiw/react-md-editor";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { selectDisplayPost } from "slices/postsSlice";
import { selectIsOnMobile, selectUser } from "slices/userSlices";

const CommentButton: FC<{ postID: string, selectComment: boolean, setSelectComment: any, handleInputClick: any}> = (props) => {
  const dispatch = useAppDispatch();
  const [commentBody, setCommentBody] = useState<string>("");
  const user = useAppSelector(selectUser);
  const isOnMobile = useAppSelector(selectIsOnMobile);

  return (
    <button
      type="button"
      className={`
          "mb-10 inline-block ${isOnMobile ? "w-20" : "w-fit"} px-1 h-7 bg-[#99C2A2] text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-[#93B1A7] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out
        `}
      id="exampleFormControlInput3"
      onClick={props.handleInputClick}
      value={commentBody}
      disabled={user.email === "noUser" ? true : false}
      onChange={() => {return;}}
    >
    Comment
    </button>
  );
};
export default CommentButton;
