import { FC } from "react";
import { useDispatch } from "react-redux";
import { setNewRequest } from "../../slices/postsSlice";
import { selectUser } from "slices/userSlices";
import { useAppSelector } from "app/hooks";
import { toast } from "react-toastify";

const NewPostButton: FC<{}> = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const buttonStyle =
    "intro-addPost self-center h-8 px-2 rounded-md text-sm text-center text-white bg-[#99C2A2]";
  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={() => {
        if (user && user.email === "noUser") {
          toast.error("You must login to create a post!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        dispatch(setNewRequest(true));
      }}
    >
      + New Post
    </button>
  );
};

export default NewPostButton;
