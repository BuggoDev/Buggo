import { FC } from "react";
import { Post } from "resources/commonTypes";
import SearchPostCard from "./SearchPostCard";

const SearchPostList: FC<{ filteredPosts: Post[] }> = ({ filteredPosts }) => {
  return (
    <div className="overflow-y-auto space-y-2">
      {filteredPosts.map((post, index) => (
        <div key={index}>
          <SearchPostCard post={post}/>
        </div>
      ))}
    </div>
  );
};

export default SearchPostList;