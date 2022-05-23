import { useAppSelector } from "app/hooks";
import React, { useState } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { api } from "resources/api";
import { Post, PostStatus } from "resources/commonTypes";
import { selectDisplayPost, selectPosts, updateDisplayingPost } from "slices/postsSlice";
import { selectIsUserDeveloper } from "slices/projectSlice";
import { selectIsOnMobile } from "slices/userSlices";

export const ArrowDropdownComponent: FC<{
  whitelisted: boolean;
}> = ({ whitelisted }) => {
  return whitelisted ? (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="caret-down"
      className="w-2 ml-2"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
      ></path>
    </svg>
  ) : null;
};

export const dropdownItemFormat = `
  dropdown-item
  text-sm font-normal
  py-2 px-4 block w-full
  whitespace-nowrap bg-transparent
  text-gray-700 hover:bg-gray-100 hover:cursor-pointer
`;
export const dropdownItemDisabledFormat = `
  dropdown-item
  text-sm font-normal text-gray-400
  py-2 px-4 block w-full
  whitespace-nowrap bg-transparent
  pointer-events-none
`;

export const postStatusStyling: string =
  "right-6 top-4 flex flex-row h-fit space-x-3 right-0 justify-center pb-3";

const PostStatusComponent: FC = () => {
  const dispatch = useDispatch();
  const post = useAppSelector(selectDisplayPost);
  const isOnMobile = useAppSelector(selectIsOnMobile)
  const whitelisted = useAppSelector(selectIsUserDeveloper);
  const posts = useAppSelector(selectPosts);
  const [displayStatus, setDisplayStatus] = useState(post.status);
  
  /* Handle Click */
  const handleClick = async (newStatus: PostStatus) => {
    const newPost: Post = { ...post, status: newStatus };
    dispatch(updateDisplayingPost(newPost));
    await api
      .updatePost(
        post.title,
        post.body,
        post.post_type,
        newStatus,
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
    min-w-max absolute hidden z-50
    bg-white bg-clip-padding border-slate-600 border-2
    text-base float-left text-left
    py-2 list-none rounded-lg mt-1 m-0
  `;
  const statusComponentFormat = `
    dropdown-toggle px-3 py-2.5
    bg-white rounded-xl border-slate-600 border-2
    text-black font-medium text-xs leading-tight uppercase
    transition duration-150 ease-in-out
    flex items-center
    whitespace-nowrap
    ${whitelisted ? "hover:shadow-lg" : ""}
    ${whitelisted ? "focus:shadow-lg focus:outline-none focus:ring-0" : ""}
    ${whitelisted ? "active:shadow-lg active:text-white" : ""}
  `;


  React.useEffect(() => {
    setDisplayStatus(post.status);
  }, [post, post.status, posts]);

  return (
    <div className={postStatusStyling}>
      <div>
        <div className="dropdown relative">
          <button
            className={statusComponentFormat}
            type="button"
            id="dropdownMenuButton1ds"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {displayStatus}
            <ArrowDropdownComponent whitelisted={whitelisted} />
          </button>
          <ul
            className={dropdownButtonFormat}
            aria-labelledby="dropdownMenuButton1ds"
          >
            <li>
              <a
                className={
                  displayStatus === PostStatus.Reported
                    ? dropdownItemDisabledFormat
                    : dropdownItemFormat
                }
                onClick={() => handleClick(PostStatus.Reported)}
              >
                {PostStatus.Reported}
              </a>
            </li>
            <li>
              <a
                className={
                  displayStatus === PostStatus.InProgress
                    ? dropdownItemDisabledFormat
                    : dropdownItemFormat
                }
                onClick={() => handleClick(PostStatus.InProgress)}
              >
                {PostStatus.InProgress}
              </a>
            </li>
            <li>
              <a
                className={
                  displayStatus === PostStatus.Resolved
                    ? dropdownItemDisabledFormat
                    : dropdownItemFormat
                }
                onClick={() => handleClick(PostStatus.Resolved)}
              >
                {PostStatus.Resolved}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostStatusComponent;
