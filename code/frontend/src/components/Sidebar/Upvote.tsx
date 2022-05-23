import { FC, useEffect, useState } from "react";
import { api } from "../../resources/api";
import { Post } from "../../resources/commonTypes";
import { selectUser } from "slices/userSlices";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { toast } from "react-toastify";
import { updateDisplayingPost } from "slices/postsSlice";

const Upvote: FC<{
  post: Post;
}> = (props) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(props.post.votes);
  const [upvoted, setUpvoted] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.email === "noUser") {
      setUpvoted(false);
    }
    if (user.email && props.post.list_of_upvotes.includes(user.email)) {
      setUpvoted(true);
    }
  }, [props.post, user.email]);
  const increment = async () => {
    if (!user.email) {
      return;
    }
    //temporarly logic for upvoting, will update when user account are made
    if (user && user.email === "noUser") {
      toast.error("You must login to upvote a post!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let newList;
    if (props.post.list_of_upvotes.includes(user.email)) {
      setUpvoted(true);
    }
    if (upvoted === false) {
      setCount(count + 1);
      setUpvoted(true);
      newList = [...props.post.list_of_upvotes, user.email];
      await api.incrementOne(props.post.id, user.email, 1).catch((err) => {
        console.log(err);
      });
    } else {
      setCount(count - 1);
      setUpvoted(false);

      const index = props.post.list_of_upvotes.indexOf(user.email);
      newList = [...props.post.list_of_upvotes];
      if (index !== -1) {
        newList.splice(index, 1);
      }
      await api.incrementOne(props.post.id, user.email, -1).catch((err) => {
        console.log(err);
      });
    }
    let newPost: Post = {
      ...props.post
    }
    newPost.list_of_upvotes = [...newList];
    dispatch(updateDisplayingPost(newPost));
  };

  return (
    <div className="flex flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={upvoted ? "red" : "none"}
        viewBox="0 0 24 24"
        stroke={upvoted ? "red" : "currentColor"}
        strokeWidth="2"
        onClick={increment}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {count}
    </div>
  );
};

export default Upvote;
