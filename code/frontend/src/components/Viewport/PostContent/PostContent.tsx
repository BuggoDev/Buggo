import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "app/hooks";
import Upvote from "components/Sidebar/Upvote";
import { FC, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { selectIsUserDeveloper } from "slices/projectSlice";
import { Post} from "resources/commonTypes";
import { selectPosts } from "slices/postsSlice";
import { selectUser, isSignedIn, selectIsOnMobile } from "slices/userSlices";
import CommentButton from "../Comments/CommentButton";
import PostSubscribeComponent from "./PostTypeAndStatus/PostSubscribeComponent";
import PostTypeComponent from "./PostTypeAndStatus/PostTypeComponent";
import PostStatusComponent from "./PostTypeAndStatus/PostStatusComponent";

export const postFormatting: string = "flex flex-col w-full p-6 border-b-2 bg-white";
export const bodyFormatting: string = "pl-1 pt-6 pb-12";
export const infoFormatting: string = "text-sm";

const PostContent: FC<{
  post: Post;
  selectComment: boolean;
  setSelectComment: any;
  handleInputClick: any;
}> = ({ post, selectComment, setSelectComment, handleInputClick }) => {
  const user = useAppSelector(selectUser);
  const isOnMobile = useAppSelector(selectIsOnMobile)
  const posts = useAppSelector(selectPosts);
  const [displayType, setDisplayType] = useState(post.post_type);
  const whitelisted = useAppSelector(selectIsUserDeveloper);
  const signedIn = useAppSelector(isSignedIn);
  const headerFormatting: string = `${isOnMobile ? "flex flex-col" : "flex flex-row"}`;

  const date = new Date(post.post_time);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("default", { day: "numeric" });
  const year = date.toLocaleString("default", { year: "numeric" });

  useEffect(() => {
    setDisplayType(post.post_type);
  }, [post, post.post_type, posts]);

  return (
    <div>
      <div className={postFormatting}>
        {/* Header (Post Title, Post Status, Post Type) */}
        <div className={headerFormatting}>
          <h2 className="font-semibold w-full text-3xl mb-5">{post.title}</h2>

          <PostStatusComponent />
        </div>

        <div className={`${headerFormatting} pb-4`}>
          <PostTypeComponent
            currentType={displayType}
            whitelisted={whitelisted}
          />
        </div>

        {/* User Info (Post User, Post Time) */}
        <div className={infoFormatting}>
          <div className="flex flex-row space-x-1">
            <h6 className="inline-block break-all font-semibold text-[#99C2A2]">
              {post.user ? post.user.email : "Author"}
            </h6>
          </div>
          <span className="text-sm text-gray-500">{` ${"on"} ${month} ${day}, ${year}`}</span>
        </div>

        {/* Post Body */}
        <div className={bodyFormatting} data-color-mode="light">
          <MDEditor.Markdown
            source={post.body}
            rehypePlugins={[[rehypeSanitize]]}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-row-reverse w-full">
          {/* Right Half */}
          <div className="flex flex-row-reverse w-1/2">
            <CommentButton
              postID={post.id}
              selectComment={selectComment}
              setSelectComment={setSelectComment}
              handleInputClick={handleInputClick}
            />
          </div>

          {/* Left Half */}
          <div className="flex flex-row w-1/2">
            {signedIn && <PostSubscribeComponent postID={post.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
