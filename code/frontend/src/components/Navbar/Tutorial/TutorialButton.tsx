import { FC } from "react";
import { useDispatch } from "react-redux";
import { setNewRequest } from "../../../slices/postsSlice";
import { selectIsOnMobile, selectUser } from "slices/userSlices";
import { useAppSelector } from "app/hooks";
import { toast } from "react-toastify";

const TutorialButton: FC<{ setTutorial: Function }> = ({ setTutorial }) => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const isOnMobile = useAppSelector(selectIsOnMobile);

  const buttonStyle =
    "self-center h-7 px-2 rounded-md text-sm text-center text-white bg-buggoGreen";
  return (
    <>
      {isOnMobile ? (
        <></>
      ) : (
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            if (user && user.email === "noUser") {
              toast.error("You must login to start the tutorial!", {
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
            setTutorial(true);
          }}
        >
          Start Tutorial
        </button>
      )}
    </>
  );
};

export default TutorialButton;
