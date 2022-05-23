import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC, useEffect } from "react";
import { api } from "resources/api";
import { useDispatch } from "react-redux";
import {
  setNewRequest,
  selectPosts,
  updateDisplayingPostIndex,
  updatePosts,
  selectDisplayPostIndex,
  updatePostClicked,
} from "slices/postsSlice";
import {
  selectIsOnMobile,
  updateIsOnMobile,
  updateUserEmail,
} from "slices/userSlices";
import Upvote from "./Upvote";
import { Post, PostType, Project } from "resources/commonTypes";


const PostPreview: FC<{
  index: number;
  setDisplayPost: Function;
  post: Post;
}> = (props) => {
  const selectedPostIndex = useAppSelector(selectDisplayPostIndex);
  const dispatch = useDispatch();
  const isOnMobile = useAppSelector(selectIsOnMobile);

  const postPreviewCardStyle = `border-l-8 block p-2 hover:cursor-pointer ${
    props.post.post_type === PostType.BugReport
      ? "border-[#99C2A2]"
      : "border-[#C5EDAC]"
  } ${
    props.index === selectedPostIndex && !isOnMobile
      ? "bg-gray-200"
      : "bg-white"
  } ${!isOnMobile ? "hover:bg-gray-100" : ""}`;

  const titleStyle = "text-gray-900 text-xl leading-tight font-bold b-2 pl-2";
  const idAndTypeStyle =
    "inline-block break-all text-gray-700 text-sm mb-2 pt-2 pl-2";

  return (
    <>
      <div className="">
        <div
          className={postPreviewCardStyle}
          onClick={() => {
            dispatch(setNewRequest(false));
            props.setDisplayPost(props.index);
            dispatch(updatePostClicked(true));
          }}
        >
          <div className={idAndTypeStyle}>
            Request #{props.post.post_number}
          </div>
          <h5 className={titleStyle}>{props.post.title}</h5>
          <div className="flex lg:flex-row-reverse">
            <Upvote post={props.post} />
          </div>
        </div>
      </div>
    </>
  );
};

const SamplePostPreview: FC = () => {
  const postPreviewCardStyle = "border-r-8 border-l-8 lock p-2 border-[#99C2A2] bg-gray-100";
  const textStyle = "text-center";
  return (
    <div>
      <div className={postPreviewCardStyle}>
        <h5 className={textStyle}>No Posts Yet!</h5>
      </div>
    </div>
  )
}

const PostList: FC<{ project: Project }> = (props) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  const fetchPostsAndUser = () => {
    api
      .fetchPosts(props.project.id)
      .then((res) => {
        dispatch(updatePosts(res.data.data));
      })
      .catch((err) => {
        // display an alert to user
        console.log(err);
      });

    api
      .getUser()
      .then((res) => {
        if (res.data.currentUser) {
          dispatch(updateUserEmail(res.data.currentUser.email));
        }
      })
      .catch((err) => {
        // display an alert to user
        console.log(err);
      });
  };

  const mostRecent = (first: Post, second: Post) => {
    return second.post_time.getTime() - first.post_time.getTime();
  };

  const mostVoted = (first: Post, second: Post) => {
    return second.votes - first.votes;
  };

  const setDisplayPost = (index: number) => {
    dispatch(updateDisplayingPostIndex(index));
  };

  useEffect(() => {
    fetchPostsAndUser();
  }, [props.project]);

  return (
    <>
      <div className="overflow-y-auto h-[calc(100%_-_75px)] space-y-1 pr-2">
        {posts.length > 0 
          ? (
            posts.map((post, index) => (
              <div key={index}>
                <PostPreview
                  index={index}
                  setDisplayPost={setDisplayPost}
                  post={post}
                />
              </div>
            ))
          )
          : <SamplePostPreview />
        }
      </div>
    </>
  );
};

export default PostList;
