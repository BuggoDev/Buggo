import { FC } from "react";
import { ReactComponent as DropdownArrowSvg } from "../../resources/svg/dropdownArrow.svg";
import { SearchQuery } from "./SearchModal";

const TypeFilter: FC<{ query: SearchQuery, setTypeFilter: Function }> = ({
  query,
  setTypeFilter
}) => {
  const dropdownButtonFormatting: string = 
  `
    dropdown-toggle
    px-4 py-1.5 bg-gray-200
    text-gray-700 font-medium text-xs leading-tight uppercase
    rounded
    hover:bg-gray-200 
    focus:bg-gray-300 focus:outline-none focus:ring-0
    active:bg-gray-300 active:text-gray-700
    transition duration-150 ease-in-out flex items-center whitespace-nowrap
  `;
  const dropdownListFormatting: string =
  `
    dropdown-menu
    min-w-max absolute hidden bg-white
    text-base z-50 float-left py-2
    list-none text-left
    rounded-lg shadow-lg
    mt-1 m-0 hidden
    bg-clip-padding border-none
  `;
  const dropdownItemFormatting: string =
  `
    dropdown-item
    text-sm
    py-2
    px-4
    font-normal
    block
    w-full
    whitespace-nowrap
    bg-transparent
    text-gray-700
    hover:bg-gray-100 hover:cursor-pointer
  `
  return (
    <div className="dropdown relative">
      <button className={dropdownButtonFormatting}
        type="button" id="dropdownMenuButton1"
        data-bs-toggle="dropdown" aria-expanded="false"
      >
        {query.post_type}
        <DropdownArrowSvg/>
      </button>
      <ul className={dropdownListFormatting} aria-labelledby="dropdownMenuButton1">
        <li>
          <a className={dropdownItemFormatting} onClick={() => setTypeFilter("Any Type")}>
            Any Type
          </a>
        </li>
        <hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
        <li>
          <a className={dropdownItemFormatting} onClick={() => setTypeFilter("Bug Report")}>
            Bug Report
          </a>
        </li>
        <li>
          <a className={dropdownItemFormatting} onClick={() => setTypeFilter("Feature Request")}>
            Feature Request
          </a>
        </li>
      </ul>
    </div>
  )
};

export default TypeFilter;