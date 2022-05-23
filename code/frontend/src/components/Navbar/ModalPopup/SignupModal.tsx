import React, { useState } from "react";
import BaseModalWrapper from "./BaseModalWrapper";
import { Button, ButtonContainer, Error } from "./ModalPopup.styled";
import InputWithIcon from "./InputWithIcon";
import { api } from "resources/api";
import { useAppDispatch } from "app/hooks";
import { updateUser } from "slices/userSlices";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import GoogleAuth from "./GoogleAuth";
import GithubAuth from "./GithubAuth";

export interface SignupArgs {
  password: string;
  login: string;
}

export type SignupFunction = (args: SignupArgs) => Promise<void>;

interface SignupModalProps {
  onBackdropClick: () => void;
  isSignupModalVisible: boolean;
  toggleSigninModal: () => void;
  signupError?: string;
}

const SignupModal: React.FC<SignupModalProps> = ({
  signupError,
  isSignupModalVisible,
  onBackdropClick,
  toggleSigninModal,
}) => {
  const dispatch = useAppDispatch();

  const [signup, setSignup] = useState("");

  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const submitHandler = () => {
    if (confirmPassword === inputPassword) {
      api
        .signup(inputPassword, signup) // assume User by default
        .then(({ data }) => {
          dispatch(updateUser(data.user));
          setCookie("token", data.token, { path: "/", maxAge: 3600 });
        })
        .catch((err) =>
          err.response.data.errors.map((e: any) => {
            console.log(e);
            toast.error(e.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
        );
    } else {
      // passwords do not match
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <BaseModalWrapper
      onBackdropClick={onBackdropClick}
      isModalVisible={isSignupModalVisible}
      header="Create Your Buggo Account"
      content={
        <>
          <div className="mt-5" />
          <InputWithIcon
            value={signup}
            onChange={(e) => setSignup(e.target.value)}
            type="text"
            placeholder="email"
          />

          <InputWithIcon
            onChange={(e) => setInputPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <InputWithIcon
            // comfirm password
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password"
          />

          {signupError && <Error>{signupError}</Error>}
          <ButtonContainer>
            <Button onClick={submitHandler}>Sign Up</Button>
          </ButtonContainer>
          <div className="mb-2" />
          <p style={{ fontSize: "20px" }}>OR</p>
          <div className="mb-2" />
          <div className="flex flex-row space-x-1">
            <GoogleAuth />
          </div>
          <div className="mb-5" />
          <div className="flex flex-row space-x-1">
            <GithubAuth />
          </div>
          <div className="mb-5" />
          <p style={{ fontSize: "16px" }}>Already have an account?</p>
          <div>
            <button style={{ fontSize: "16px" }} onClick={toggleSigninModal}>
              Login
            </button>
          </div>
        </>
      }
    />
  );
};

export default SignupModal;
