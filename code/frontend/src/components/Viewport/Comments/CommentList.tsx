import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC, useEffect, useState } from "react";
import { api } from "resources/api";
import { selectDisplayPost, updateDisplayingPost } from "slices/postsSlice";
import { Post } from "resources/commonTypes";
import CommentBlock from "./CommentBlock";
import { selectIsOnMobile, selectUser } from "slices/userSlices";
import { toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { clipBoardToFormData, dropImageToFormData } from "resources/utils";

const CommentList: FC<{
  postID: string;
  selectComment: boolean;
  setSelectComment: any;
  handleInputClick: any;
}> = (props) => {
  const dispatch = useAppDispatch();
  const [newCommentMade, setNewCommentMade] = useState<boolean>(false);
  const [commentBody, setCommentBody] = useState<string>("");
  const currentPost = useAppSelector(selectDisplayPost);
  const user = useAppSelector(selectUser);
  const isOnMobile = useAppSelector(selectIsOnMobile);
  useEffect(() => {
    props.setSelectComment(false);
    setNewCommentMade(false);
  }, [newCommentMade]);

  const imageHandler = (event: any) => {
    let formData;
    if (event.type === "paste") {
      formData = clipBoardToFormData(event);
    } else if (event.type === "drop") {
      event.preventDefault();
      formData = dropImageToFormData(event);
    }
    if (formData) {
      api.uploadMedia(formData).then((res) => {
        setCommentBody(
          commentBody + `![](https://cdn.buggo.org/${res.data.data.key})`
        );
      });
    }
  };

  useEffect(() => {
    document.addEventListener("drop", imageHandler);
    document.addEventListener("paste", imageHandler);
    return () => {
      document.removeEventListener("drop", imageHandler);
      document.removeEventListener("paste", imageHandler);
    };
  });

  const handlePost = async () => {
    if (commentBody.length < 2) {
      toast.error("Comments must be at least 2 characters!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      api
        .createComment(commentBody, props.postID)
        .then((res) => {
          const commentReturn: any = res.data;
          const updatedPost: Post = {
            ...currentPost,
            comments: [...currentPost.comments, commentReturn],
          };
          dispatch(updateDisplayingPost(updatedPost));
          setCommentBody("");
          props.setSelectComment(false);
        })
        .catch((err) => {
          // display an alert to user
          console.log(err);
        });
    }
  };

  return (
    <>
      {/* Add a new comment */}
      {props.selectComment ? (
        <div data-color-mode="light">
          <MDEditor
            value={commentBody}
            onChange={(newCommentBody) => {
              if (newCommentBody !== undefined) {
                setCommentBody(newCommentBody);
              }
            }}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
      ) : (
        <></>
      )}
      {/*Post and Cancel*/}
      {props.selectComment ? (
        <>
          <div
            className={`flex flex-row mb-10 ${
              isOnMobile ? "justify-center space-x-28" : ""
            }`}
          >
            <button
              type="button"
              className={`${
                isOnMobile ? "w-10 text-[8px]" : "w-1/3 text-xs"
              } mb-10 mt-3 inline-block h-7 bg-[#99C2A2] text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-[#93B1A7] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out`}
              onClick={handlePost}
            >
              Post
            </button>
            <button
              type="button"
              className={`${
                isOnMobile ? "w-10 text-[8px]" : "w-1/3 ml-72 text-xs"
              } mb-10 mt-3 inline-block h-7 bg-red-500 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out`}
              onClick={() => {
                props.setSelectComment(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* List all of the comments */}
      <div>
        {currentPost.comments.map((comment, index) => (
          <div key={index} className="pt-3">
            <CommentBlock comment={comment} />
          </div>
        ))}
      </div>

      {/*Initial state of making new comment*/}
      <div className="flex">
        <div
          className="w-full pb-12"
          onClick={() => {
            if (user && user.email === "noUser") {
              toast.error("You must login to create a comment!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }}
        ></div>
      </div>
    </>
  );
};

export default CommentList;
