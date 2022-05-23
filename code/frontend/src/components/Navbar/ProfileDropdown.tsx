import { useAppDispatch, useAppSelector } from "app/hooks";
import { useCookies } from "react-cookie";
import { resetUser, selectIsOnMobile, selectUser } from "slices/userSlices";

const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ProfileDropDown = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const user = useAppSelector(selectUser);
  const isOnMobile = useAppSelector(selectIsOnMobile);
  const dispatch = useAppDispatch();

  const signout = () => {
    removeCookie("token");
    localStorage.removeItem("gitAccessToken");
    dispatch(resetUser());
  };
  const profileIcon = user.profile_url ? (
    <div>
      <img
        src={user.profile_url}
        alt="profile"
        className="inline object-cover w-6 h-6 rounded-full mr-1"
        referrerPolicy="no-referrer"
      />
    </div>
  ) : (
    defaultIcon
  );

  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <button
            className={`
              ${isOnMobile ? "" : "flex"} 
              dropdown-toggle
              px-6
              py-2.5
              bg-transparent
              text-black
              font-medium
              text-xs
              leading-tight
              transition
              duration-150
              ease-in-out
              items-center
              whitespace-nowrap
              `}
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {profileIcon}
            {user.email}
          </button>
          <ul
            className="
          dropdown-menu
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
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        "
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button
                className="
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
              hover:bg-gray-100
            "
                onClick={signout}
              >
                Sign out {user.provider !== "native" && user.provider}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
