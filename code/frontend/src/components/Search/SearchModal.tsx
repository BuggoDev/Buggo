import { useAppSelector } from "app/hooks";
import React, { useState } from "react";
import { Post } from "resources/commonTypes";
import { selectPosts } from "slices/postsSlice";
import SearchBar from "./SearchBar";
import SearchPostList from "./SearchPostList";
import StatusFilter from "./StatusFilter";
import TypeFilter from "./TypeFilter";

export interface SearchQuery {
  text: string,
  post_type: string,
  post_status: string,
}

export const defaultSearchQuery: SearchQuery = {
  text: "",
  post_type: "Any Type",
  post_status: "Any Status"
};

const SearchModal: React.FC<{}> = () => {
  const posts = useAppSelector(selectPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searched, setSearched] = useState<boolean>(false);

  const [query, setQuery] = useState<SearchQuery>(defaultSearchQuery);

  const setStatusFilter = (newStatus: string) => {
    setQuery({
      ...query,
      post_status: newStatus
    });
  }

  const setTypeFilter = (newType: string) => {
    setQuery({
      ...query,
      post_type: newType
    });
  }

  const defaultSearch = (
    <p className="text-gray-700 text-lg text-center">
      The posts you are looking for will show up here!
    </p>
  );
  const noMatch = (
    <p className="text-gray-700 text-lg text-center">
      No matching posts!
    </p>
  )
  const headerFormatting: string = "modal-header flex flex-shrink-0 items-center space-x-2 px-4 pt-4 rounded-t-md border-b";

  const handleSubmit = () => {
    let filtering: Post[] = posts;
    setSearched(true);

    /* Filter by STATUS */
    if (query.post_status !== "Any Status") {
      filtering = filtering.filter(post => post.status === query.post_status);
    }

    /* Filter by TYPE */
    if (query.post_type !== "Any Type") {
      filtering = filtering.filter(post => post.post_type === query.post_type);
    }

    /* Filter by TEXT */
    if (query.text) {
      filtering = filtering.filter(post => (post.body.includes(query.text) || post.title.includes(query.text)));
    }

    setFilteredPosts(filtering);
  };

  return (
    <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="modal-test" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-scrollable relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full h-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">

          {/* Header */}
          <div className={headerFormatting}>
            {/* Search Bar */}
            <div className="w-5/6">
              <SearchBar 
                query={query}
                setQuery={setQuery}
                handleSubmit={handleSubmit}
              />
            </div>

            {/* Search Filters */}
            <div className="flex flex-row space-x-2 pb-4">
              <StatusFilter query={query} setStatusFilter={setStatusFilter} />
              <TypeFilter query={query} setTypeFilter={setTypeFilter} />
            </div>

          </div>

          {/* Body */}
          <div className="modal-body relative p-4">
            { searched 
              ? filteredPosts.length
                ? <SearchPostList filteredPosts={filteredPosts} />
                : noMatch
              : defaultSearch
            }
          </div>
          
          {/* Footer */}
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
            <button type="button"
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-200 hover:shadow-lg focus:bg-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;