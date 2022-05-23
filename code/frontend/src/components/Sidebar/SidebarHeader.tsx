import { SearchQuery } from "components/Search/SearchModal";
import { FC } from "react";
import NewPostButton from "./NewPostButton";
import SearchButton from "./SearchButton";

export interface FilterParams {
  setStatusFilter: Function;
  setTypeFilter: Function;
  query: SearchQuery;
}

const SidebarHeader: FC<FilterParams> = ({
  setStatusFilter,
  setTypeFilter,
  query,
}) => {
  const headerStyle = "flex flex-row pt-4 px-5 h-fit w-full mx-auto";

  return (
    <>
      <div className={headerStyle}>
        <div className="relative flex flex-row w-full mb-4 space-x-2 justify-center">
          {/* <StatusFilter query={query} setStatusFilter={setStatusFilter} />
              <TypeFilter query={query} setTypeFilter={setTypeFilter} /> */}
          <SearchButton />
          <NewPostButton />
        </div>
      </div>
    </>
  );
};

export default SidebarHeader;
