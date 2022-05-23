import { FC } from "react";
import { Post } from "resources/commonTypes";
import { selectPosts, updateDisplayingPostIndex } from "slices/postsSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/hooks";

const SearchPostCard: FC<{ post: Post }> = ({ post }) => {
  const dispatch = useDispatch();
  const posts = useAppSelector(selectPosts);

  const badgeStyling: string = "text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#99C2A2] text-white rounded";
  const removeMd = require("remove-markdown");
  
  if (!post) {
    return null;
  }

  const setDisplayingPost = () => {
    dispatch(updateDisplayingPostIndex(posts.indexOf(post)))
  }

  return (
    <div className="flex justify-left">
      <div
        className="block rounded-lg bg-white max-w-full w-full max-h-md border hover:cursor-pointer hover:bg-gray-100"
        data-bs-dismiss="modal"
        onClick={setDisplayingPost}
      >

        {/* Header */}
        <div className="py-1 px-2 border-gray-300 flex flex-row w-full">
          <p className="font-bold text-2xl">
            {post.title}
          </p>
        </div>

        {/* Body */}
        <p className="text-gray-700 text-md py-1 px-2 truncate">
          {removeMd(post.body)}
        </p>

        {/* Type and Status */}
        <div className="flex flex-row-reverse space-x-reverse space-x-1 pb-1 pr-1">
          <span className={badgeStyling}>{post.post_type}</span>
          <span className={badgeStyling}>{post.status}</span>
        </div>
        
      </div>
    </div>
  );
};

export default SearchPostCard;