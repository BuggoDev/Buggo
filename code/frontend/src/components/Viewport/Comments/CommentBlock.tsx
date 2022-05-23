import { FC } from "react";
import { ReactComponent as ReplySvg } from "../../../resources/svg/reply.svg";
import { Comment } from "../../../resources/commonTypes";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const CommentBlock: FC<{
  comment: Comment;
}> = ({ comment }) => {
  const date = new Date(comment.post_time);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("default", { day: "numeric" });
  const year = date.toLocaleString("default", { year: "numeric" });
  let name = "Author";
  if (comment.user && comment.user.email) {
    name = comment.user.email;
  } else if (comment.user && comment.user.github_login) {
    name = comment.user.github_login;
  }
  return (
    <div className="pl-3">
      <div className="flex flex-col border-l-2 pl-2">
        <div
          key={comment.id}
          className="p-2 pb-2 rounded-lg bg-white text-gray-700"
        >
          <h6 className="inline-block break-all text-sm font-semibold text-[#99C2A2]">
            {name}
          </h6>
          <span className="text-sm text-gray-500">{` ${"on"} ${month} ${day}, ${year}`}</span>
          <div data-color-mode="light">
            <MDEditor.Markdown
              source={comment.body}
              rehypePlugins={[[rehypeSanitize]]}
            />
          </div>
          {/* <ReplySvg className="h-4 w-4 bottom-1" /> */}
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;
