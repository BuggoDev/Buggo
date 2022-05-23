import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import { api } from "resources/api";
import { Project } from "resources/commonTypes";
import { resetUser, updateUser, updateIsOnMobile } from "slices/userSlices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { Route, Routes } from "react-router";
import Dashboard from "components/Dashboard/Dashboard";
import ProjectForm from "components/Project/ProjectForm";
import ProjectList from "components/Project/ProjectList";
import UserProfileModal from "components/Navbar/ModalPopup/UserProfileModal";
import ProjectLink from "components/Project/ProjectLink";

function App() {
  const dispatch = useAppDispatch();

  const reauthenticate = () => {
    // call api to reauth on reload
    api
      .getUser()
      .then(({ data }) => {
        if (!data.currentUser) {
          // if currentUser is null, logout user
          dispatch(resetUser());
        } else {
          // object to transform attributes
          dispatch(updateUser(data.currentUser));
        }
      })
      .catch((err) => {
        // effectively log user out on error
        console.log(err);
        dispatch(resetUser());
      });
  };

  const handleResize = () => {
    /*Check the size of window, help with deciding if mobile or not*/
    if (window.innerWidth >= 1140) {
      dispatch(updateIsOnMobile(false));
    } else {
      dispatch(updateIsOnMobile(true));
    }
  };

  useEffect(() => {
    // reauthenitcate user on page reload and populate redux store
    reauthenticate();
    if (window.innerWidth >= 1140) {
      dispatch(updateIsOnMobile(false));
    } else {
      dispatch(updateIsOnMobile(true));
    }
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <AppWrapper>
      <UserProfileModal />
      <Routes>
        <Route path={"/:projectID"} element={<ProjectLink />} />
        <Route path="/createProject" element={<ProjectForm />} />
        <Route path="/myProjects" element={<ProjectList />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<div>No Match</div>} />
      </Routes>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  width: 100vw;
`;

export default App;
