import { FC } from "react";
import {
  ArrowDropdownComponent,
  dropdownItemFormat,
  dropdownItemDisabledFormat,
} from "./PostStatusComponent";
import { Post, PostType } from "resources/commonTypes";
import { api } from "resources/api";
import { selectDisplayPost, updateDisplayingPost } from "slices/postsSlice";
import { useAppSelector } from "app/hooks";
import { useDispatch } from "react-redux";

const PostTypeComponent: FC<{
  currentType: PostType;
  whitelisted: boolean;
}> = ({ whitelisted, currentType }) => {
  const dispatch = useDispatch();
  const post = useAppSelector(selectDisplayPost);

  const handleClick = async (newType: PostType) => {
    const newPost: Post = { ...post, post_type: newType };
    dispatch(updateDisplayingPost(newPost));
    await api
      .updatePost(
        post.title,
        post.body,
        newType,
        post.status,
        post.votes,
        post.id,
        post.list_of_upvotes,
        post.project
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const dropdownButtonFormat = `
    ${whitelisted ? "dropdown-menu" : ""}
    min-w-max
    absolute
    hidden
    bg-white
    text-base
    z-50 
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-slate-600
    border-2
  `;
  const typeComponentFormat = `
    dropdown-toggle px-2 py-1
    bg-[#EB8134]/30 rounded-xl shadow-md
    text-[#EB8134] font-medium text-xs leading-tight uppercase
    transition duration-150 ease-in-out
    flex items-center whitespace-nowrap
    ${whitelisted ? "hover:shadow-lg" : ""}
    ${whitelisted ? "focus:shadow-lg focus:outline-none focus:ring-0" : ""}
    ${whitelisted ? "active:shadow-lg active:text-white" : ""}
  `;
  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <button
            className={typeComponentFormat}
            type="button"
            id="dropdownMenuButton1ds"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {currentType}
            <ArrowDropdownComponent whitelisted={whitelisted} />
          </button>
          <ul
            className={dropdownButtonFormat}
            aria-labelledby="dropdownMenuButton1ds"
          >
            <li>
              <a
                className={
                  currentType === PostType.BugReport
                    ? dropdownItemDisabledFormat
                    : dropdownItemFormat
                }
                onClick={() => handleClick(PostType.BugReport)}
              >
                {PostType.BugReport}
              </a>
            </li>
            <li>
              <a
                className={
                  currentType === PostType.FeatureRequest
                    ? dropdownItemDisabledFormat
                    : dropdownItemFormat
                }
                onClick={() => handleClick(PostType.FeatureRequest)}
              >
                {PostType.FeatureRequest}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostTypeComponent;
