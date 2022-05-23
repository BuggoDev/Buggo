import { FC, useState, useEffect } from "react";
import { PostType, Project } from "../../resources/commonTypes";
import { api } from "resources/api";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useDispatch } from "react-redux";
import { setNewRequest, updatePosts } from "../../slices/postsSlice";
import { ReactComponent as XSvg } from "../../resources/svg/x.svg";
import { clipBoardToFormData, dropImageToFormData } from "resources/utils";
import { toast } from "react-toastify";
import { useAppSelector } from "app/hooks";
import { selectIsOnMobile } from "slices/userSlices";

const NewPost: FC<{ project: Project }> = ({ project }) => {
  /* Setting up Rich Text Editor */
  const dispatch = useDispatch();
  const isOnMobile = useAppSelector(selectIsOnMobile);

  const [postType, setPostType] = useState<PostType>(PostType.BugReport);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState("");

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
        setBody(body + `![](https://cdn.buggo.org/${res.data.data.key})`);
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

  const handleSubmit = async () => {
    await api
      .createPost(title, body, postType, project.id)
      .then((res) => {
        dispatch(setNewRequest(false));
        toast.success("Post created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        err.response.data.errors.map((e: any) => {
          console.log(e);
          toast.error(e.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      });

    const responsePost = await api.fetchPosts(project.id);
    dispatch(updatePosts(responsePost.data.data));
  };

  /* Tailwind Styling Variables */
  const cardPadding = "pt-7";
  const whiteCard = "p-3 shadow-lg rounded-lg bg-white text-gray-700";
  const xButtonPadding = "pr-4";
  const generalPadding = "p-3 pt-4";
  const bold = "font-bold";
  const titleTextStyle =
    "form-control block w-full h-10 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#C0D6DF] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  const bugReportButtonStyle = `inline-block px-6 py-2 border-2 ${
    postType === PostType.BugReport
      ? "bg-[#315386] text-white"
      : "border-[#315386] text-[#315386] hover:bg-black hover:bg-opacity-5"
  } font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out`;
  const featureRequestButtonStyle = `inline-block px-6 py-2 border-2 ${
    postType === PostType.FeatureRequest
      ? "bg-[#599B97] text-white"
      : "border-[#599B97] text-[#599B97] hover:bg-black hover:bg-opacity-5"
  } font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out`;
  const postButtonStyle =
    "intro-postButton inline-block px-6 py-2.5 bg-[#FDB988] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-lg transition duration-150 ease-in-out";

  return (
    <div className={cardPadding}>
      <div className={whiteCard}>
        {/* X button */}
        <div className={xButtonPadding}>
          <XSvg onClick={() => dispatch(setNewRequest(false))} />
        </div>

        {/* Add New Post */}
        <div className={`intro-postTitle ${generalPadding}`}>
          <h5 className={bold}>Add New Post</h5>

          {/*input for title */}
          <textarea
            className={titleTextStyle}
            id="exampleFormControlTextarea1"
            rows={3}
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
          ></textarea>
        </div>

        {/*Description */}
        <div
          className={`intro-postDescription ${generalPadding}`}
          data-color-mode="light"
        >
          <h5 className={`${bold} ${isOnMobile ? "pb-4" : ""}`}>Description</h5>
          <MDEditor
            value={body}
            onChange={(newBody) => {
              if (newBody !== undefined) {
                setBody(newBody);
              }
            }}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
        <div className={`intro-postTag flex w-min min-w-[25rem] ${generalPadding}`}>
          <h5 className={`${bold} pr-3`}>Tags</h5>
          <button
            type="button"
            className={bugReportButtonStyle}
            onClick={() => setPostType(PostType.BugReport)}
          >
            Bug Report
          </button>
          <div className="pl-3">
            <button
              type="button"
              className={featureRequestButtonStyle}
              onClick={() => setPostType(PostType.FeatureRequest)}
            >
              Feature Request
            </button>
          </div>
        </div>

        <div className={`${generalPadding}`}>
          <button
            type="button"
            className={`intro-postButton ${postButtonStyle}`}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
