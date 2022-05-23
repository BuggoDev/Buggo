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

export interface SigninArgs {
  password: string;
  signin: string;
}

export type SigninFunction = (args: SigninArgs) => Promise<void>;

interface SigninModalProps {
  onBackdropClick: () => void;
  isSigninModalVisible: boolean;
  toggleSignupModal: () => void;
  signinError?: string;
}

const SigninModal: React.FC<SigninModalProps> = ({
  signinError,
  isSigninModalVisible,
  onBackdropClick,
  toggleSignupModal,
}) => {
  const dispatch = useAppDispatch();
  const [signin, setSignin] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const submitHandler = () => {
    api
      .signin(password, signin)
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
  };

  return (
    <BaseModalWrapper
      onBackdropClick={onBackdropClick}
      isModalVisible={isSigninModalVisible}
      header="Sign in to Your Buggo Account"
      content={
        <>
          <div className="mt-5" />
          <InputWithIcon
            value={signin}
            onChange={(e) => setSignin(e.target.value)}
            type="text"
            placeholder="email"
          />
          <InputWithIcon
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          {signinError && <Error>{signinError}</Error>}
          <ButtonContainer>
            <Button onClick={submitHandler}>Sign In</Button>
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
          <p style={{ fontSize: "16px" }}>Not part of the Buggo Family yet?</p>
          <div>
            <button style={{ fontSize: "16px" }} onClick={toggleSignupModal}>
              Create an Account
            </button>
          </div>
        </>
      }
    />
  );
};

export default SigninModal;
