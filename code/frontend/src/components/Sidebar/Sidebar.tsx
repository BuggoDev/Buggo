import PostList from "./PostList";
import SidebarHeader from "components/Sidebar/SidebarHeader";
import { FC, useState } from "react";
import { Post, Project } from "resources/commonTypes";
import { defaultSearchQuery, SearchQuery } from "components/Search/SearchModal";
import { useAppSelector } from "app/hooks";
import {
  selectNewRequest,
  selectPostClicked,
  selectPosts,
} from "slices/postsSlice";
import { selectIsOnMobile } from "slices/userSlices";

const Sidebar: FC<{
  project: Project;
}> = (props) => {
  const posts = useAppSelector(selectPosts);
  const [query, setQuery] = useState<SearchQuery>(defaultSearchQuery);
  const isOnMobile = useAppSelector(selectIsOnMobile);
  const postClicked = useAppSelector(selectPostClicked);
  const isNewRequest = useAppSelector(selectNewRequest);

  const setStatusFilter = (newStatus: string) => {
    setQuery({
      ...query,
      post_status: newStatus,
    });
  };

  const setTypeFilter = (newType: string) => {
    setQuery({
      ...query,
      post_type: newType,
    });
  };

  return (
    <>
      { (!postClicked && isOnMobile) && (!isNewRequest && isOnMobile) || !isOnMobile ? (
        <div
          className={`${
            isOnMobile ? "w-[95%]" : "border-r-2 w-[30%]"
          } pl-2 bg-white-100`}
        >
          <SidebarHeader
            setStatusFilter={setStatusFilter}
            setTypeFilter={setTypeFilter}
            query={query}
          />
          <PostList project={props.project} />
        </div>
      ) : (
        <></>
      )}
    </>
  
  );
};

export default Sidebar;
