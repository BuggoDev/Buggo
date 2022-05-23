import { FC } from "react";
import { Comment } from "resources/commonTypes";
import CommentBlock from "./CommentBlock";

const FillerCommentList: FC = () => {
  const date = new Date(Date.now());

  const sampleComment1: Comment = {
    body: "This is an example of a comment",
    user: null,
    votes: 0,
    post_time: date,
    id: ""
  }
  const sampleComment2: Comment = {
    body: "I agree with the above comment!",
    user: null,
    votes: 0,
    post_time: date,
    id: ""
  }

  return (
    <div>
      <div className="pt-3">
        <CommentBlock comment={sampleComment1} />
      </div>
      <div className="pt-3">
        <CommentBlock comment={sampleComment2} />
      </div>
    </div>
  );
}

export default FillerCommentList;