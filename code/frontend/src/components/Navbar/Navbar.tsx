import { FC } from "react";
import LogoTitle from "./LogoTitle";
import { useState } from "react";
import SignupModal from "./ModalPopup/SignupModal";
import SigninModal from "./ModalPopup/SigninModal";
import ProfileDropDown from "./ProfileDropdown";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { isSignedIn, selectIsOnMobile, selectUser } from "slices/userSlices";
import { Project } from "../../resources/commonTypes";
import { ReactComponent as CodeSvg } from "resources/svg/code.svg"
import ImportButton from "./ImportPopup/ImportButton";
import ProjectSettingsModal from "./ModalPopup/ProjectSettingsModal";
import { selectIsUserDeveloper } from "slices/projectSlice";
import { selectPostClicked, updatePostClicked } from "slices/postsSlice";
import { ReactComponent as LeftArrow } from "../../resources/svg/leftArrow.svg";
import TutorialButton from "./Tutorial/TutorialButton";

const NavBarStyle = "fixed z-50 flex flex-row h-12 w-full";

const Navbar: FC<{ 
  project: Project,
  tutorial: boolean,
  setTutorial: Function
}> = (props) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(isSignedIn);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isSigninModalVisible, setIsSigninModalVisible] = useState(false);
  const user = useAppSelector(selectUser);
  const isUserDeveloper = useAppSelector(selectIsUserDeveloper);

  const [isProjectSettingsModalVisible, setIsProjectSettingsModalVisible] =
    useState(false);
  const postClicked = useAppSelector(selectPostClicked);
  const isOnMobile = useAppSelector(selectIsOnMobile);

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

  const onBackdropClickProjectSettings = () => {
    setIsProjectSettingsModalVisible(false);
  };

  return (
    <div className={NavBarStyle}>
      <div className="w-1/2 flex flex-row">
        {(isOnMobile && !postClicked) || !isOnMobile ? (
          <LogoTitle project={props.project} />
        ) : (
          <div className="p-3">
            <LeftArrow onClick={() => dispatch(updatePostClicked(false))} />
          </div>
        )}
        
      </div>
      <div className="w-1/2 flex flex-row-reverse">
        {!loggedIn && (
          <>
            {/* Signup */}
            <button
              onClick={toggleSignupModal}
              className="inset-y-0 right-20 bg-transparent text-black-700 font-semibold h-8 px-4 m-2 text-sm border-transparent hover:border-transparent rounded"
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
              className="inset-y-0 right-0 bg-transparent text-black-700 font-semibold h-8 px-4 m-2 text-sm border-transparent hover:border-transparent rounded"
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
            <div className="">
              <div className="flex flex-row">
                {user.provider === "github" ? (
                  <>
                    {!isOnMobile || (isOnMobile && !postClicked) ? (
                      <ImportButton project={props.project} />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <ProfileDropDown />
                {isUserDeveloper && (
                  <div className="cursor-pointer pt-2.5 pr-3 hover:scale-110">
                    <CodeSvg
                      onClick={() => {
                        setIsProjectSettingsModalVisible(true);
                      }}
                    />
                    <ProjectSettingsModal
                      isProjectSettingsModalVisible={
                        isProjectSettingsModalVisible
                      }
                      onBackdropClick={onBackdropClickProjectSettings}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {!props.tutorial ? (
          <div className="pt-2 pr-6">
            <TutorialButton
              setTutorial={props.setTutorial}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
