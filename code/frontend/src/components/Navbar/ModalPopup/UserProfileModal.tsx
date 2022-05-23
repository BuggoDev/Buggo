import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseModalWrapper from "./BaseModalWrapper";
import { Button, ButtonContainer, Error } from "./ModalPopup.styled";
import InputWithIcon from "./InputWithIcon";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectUser,
  isSignedIn,
  toggleProfileModal,
  updateUser,
} from "slices/userSlices";
import { api } from "resources/api";

const UserProfileModal = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.user.profileModalVisible);
  const user = useAppSelector(selectUser);
  const signedIn = useAppSelector(isSignedIn);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const isUserProfileIncomplete = () => {
    if (!user.email) return true;
    if (!user.first_name) return true;
    if (!user.last_name) return true;
    return false;
  };

  useEffect(() => {
    if (signedIn && isUserProfileIncomplete()) {
      setEmail(user.email || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      dispatch(toggleProfileModal(true));
    } else {
      dispatch(toggleProfileModal(false));
    }
  }, [user, signedIn]);

  const submitHandler = () => {
    api
      .updateUserProfile(firstName, lastName, email)
      .then(({ data }) => {
        dispatch(updateUser(data.currentUser));
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(toggleProfileModal(false));
      })
      .catch((err) => {
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
        });
      });
  };

  return (
    <BaseModalWrapper
      onBackdropClick={() => {}}
      isModalVisible={isVisible}
      header="Update Your Profile"
      content={
        <>
          <div className="mt-5" />
          <InputWithIcon
            type="text"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputWithIcon
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <InputWithIcon
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <ButtonContainer>
            <Button onClick={submitHandler}>Confirm</Button>
          </ButtonContainer>
        </>
      }
    />
  );
};

export default UserProfileModal;
