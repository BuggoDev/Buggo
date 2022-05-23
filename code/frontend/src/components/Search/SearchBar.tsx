import { FC, MouseEventHandler, useEffect } from "react";
import { SearchQuery } from "./SearchModal";
import { ReactComponent as SearchSvg } from "../../resources/svg/search.svg";

interface SearchBarParams {
  query: SearchQuery,
  setQuery: Function,
  handleSubmit: Function,
};

const SearchBar: FC<SearchBarParams> = ({
  query, setQuery, handleSubmit
}) => {
  const searchBarFormatting: string = 
  `
    form-control relative flex-auto min-w-0 block w-full px-3 py-1.5
    text-base font-normal text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded transition ease-in-out m-0
    active:outline-hidden outline-none
    focus:text-gray-700 focus:ring-0 focus:placeholder-transparent
  `;

  const searchButtonFormatting: string =
  `
    btn inline-block px-6 py-2.5 bg-[#99C2A2] active:bg-[#79af84]
    text-white font-medium text-xs leading-tight uppercase rounded shadow-md
    transition duration-150 ease-in-out flex items-center
  `

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-justify-center">
      <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
        <input
          onChange={event => setQuery({...query, text: event.target.value})} 
          onKeyPress={(event) => handleKeyPress(event)}
          autoComplete="off" autoFocus
          type="text"
          className={searchBarFormatting}
          id="exampleSearch"
          placeholder={query.text ? query.text : "Search for a post"}
        />
      </div>
    </div>
  );
}

export default SearchBar;