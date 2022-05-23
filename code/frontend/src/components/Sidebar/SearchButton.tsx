import { FC } from "react";
import { ReactComponent as SearchSvg } from "../../resources/svg/search.svg";

const SearchButton: FC<{}> = () => {
  const buttonStyle =
    "self-center h-8 px-2 rounded-md text-sm text-center text-white bg-[#99C2A2]";
  return (
    <button
      type="button"
      className={buttonStyle}
      data-bs-toggle="modal"
      data-bs-target="#modal-test"
    > Search </button>
  );
}

export default SearchButton;