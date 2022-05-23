import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSignedIn, selectUser } from "../../slices/userSlices";
import { useAppSelector } from "app/hooks";
import SignupModal from "../Navbar/ModalPopup/SignupModal";
import SigninModal from "../Navbar/ModalPopup/SigninModal";
import ProfileDropDown from "../Navbar/ProfileDropdown";
import { ToastContainer, toast } from "react-toastify";
import { ReactComponent as Logo } from "../../resources/svg/buggo_logo.svg";

const Header: FC<{}> = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const loggedIn = useAppSelector(isSignedIn);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isSigninModalVisible, setIsSigninModalVisible] = useState(false);

  const toggleSigninModal = () => {
    if (isSignupModalVisible) {
      setIsSignupModalVisible(false);
    }
    setIsSigninModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleSignupModal = () => {
    if (isSigninModalVisible) {
      setIsSigninModalVisible(false);
    }
    setIsSignupModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const onBackdropClickSignin = () => {
    setIsSigninModalVisible(false);
  };

  const onBackdropClickSignup = () => {
    setIsSignupModalVisible(false);
  };

  const resetPath = () => {
    navigate("/");
  };

  const redirectProjectPage = () => {
    if (user && user.email === "noUser") {
      toast.error("You must login to create a project!", {
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
    resetPath();
    let path = "/createProject";
    navigate(path);
  };

  const redirectProjectList = () => {
    resetPath();
    let path = "/myProjects";
    navigate(path);
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo className="hover:cursor-pointer" onClick={resetPath} />
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <button
            onClick={redirectProjectPage}
            className="mr-5 hover:text-gray-900"
          >
            Create a Project
          </button>
          <ToastContainer />
          {!loggedIn && (
            <>
              {/* Signup */}
              <button
                onClick={toggleSignupModal}
                className="mr-5 hover:text-gray-900"
              >
                Sign Up
              </button>
              <SignupModal
                onBackdropClick={onBackdropClickSignup}
                isSignupModalVisible={isSignupModalVisible}
                toggleSigninModal={toggleSigninModal}
              />
              {/* Signin */}
              <button
                onClick={toggleSigninModal}
                className="mr-5 hover:text-gray-900"
              >
                Sign In
              </button>
              <SigninModal
                onBackdropClick={onBackdropClickSignin}
                isSigninModalVisible={isSigninModalVisible}
                toggleSignupModal={toggleSignupModal}
              />
            </>
          )}
          {loggedIn && (
            <>
              <button
                onClick={redirectProjectList}
                className="mr-5 hover:text-gray-900"
              >
                My Projects
              </button>
              <div className="mr-5 hover:text-gray-900">
                <ProfileDropDown />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
