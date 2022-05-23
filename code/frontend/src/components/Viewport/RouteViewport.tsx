import { FC, useEffect, useState } from "react";
import NewPost from "./NewPost";
import { useAppSelector } from "app/hooks";
import {
  selectNewRequest,
  selectDisplayPostIndex,
  selectPosts,
  selectPostClicked,
} from "slices/postsSlice";
import { Post, Project } from "resources/commonTypes";
import PostContent from "./PostContent/PostContent";
import CommentList from "./Comments/CommentList";
import { selectIsOnMobile } from "slices/userSlices";
import FillerPost from "./PostContent/FillerPost";
import FillerCommentList from "./Comments/FillerCommentList";

const RouteViewport: FC<{ project: Project }> = (props) => {
  const displayPostIndex = useAppSelector(selectDisplayPostIndex);
  const posts = useAppSelector(selectPosts);
  const isNewRequest: boolean = useAppSelector(selectNewRequest);
  const [selectComment, setSelectComment] = useState<boolean>(false);
  const [displayPost, setDisplayPost] = useState<Post | null>();
  const isOnMobile = useAppSelector(selectIsOnMobile);
  const postClicked = useAppSelector(selectPostClicked);

  useEffect(() => {
    if ((posts.length !== 0 && !isOnMobile) || (postClicked && isOnMobile)) {
      setDisplayPost(posts[displayPostIndex]);
    }
  }, [posts, displayPostIndex, selectComment, postClicked, isOnMobile]);

  const handleInputClick = () => {
    setSelectComment(!selectComment);
  };

  const postDetails = (
    <>
      <div className="overflow-x-hidden">
        { posts.length > 0 && displayPost
          ? (
            <div>
              <PostContent
                post={displayPost}
                selectComment={selectComment}
                setSelectComment={setSelectComment}
                handleInputClick={handleInputClick}
              />
              <CommentList
                postID={displayPost.id}
                selectComment={selectComment}
                setSelectComment={setSelectComment}
                handleInputClick={handleInputClick}
              />
            </div>
          )
          : (
            <div>
              <FillerPost />
              <FillerCommentList />
            </div>
          )
        }
      </div>
    </>
  );

  const viewportStyle =
    "w-screen flex flex-col pl-5 pr-5 space-y-5 overflow-y-auto bg-white-100 overscroll-y-contain";
  return (
    <>
      {(postClicked && isOnMobile) || (!isOnMobile) || (isNewRequest && isOnMobile) ? (
        <div className={viewportStyle}>
          {isNewRequest ? <NewPost project={props.project} /> : postDetails}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RouteViewport;
