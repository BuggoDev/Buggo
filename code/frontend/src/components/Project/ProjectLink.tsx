import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import RouteViewport from "../Viewport/RouteViewport";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import SearchModal from "components/Search/SearchModal";
import { useState } from "react";
import Joyride from "react-joyride";
import { tutorialSteps } from "resources/tutorial";
import { api } from "resources/api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setCurrentProject, setDeveloperStatus } from "slices/projectSlice";
import { selectUser } from "slices/userSlices";
import { isUserProjectDeveloper } from "resources/utils";

const ProjectLink: FC<{}> = () => {
  let { projectID } = useParams();

  const dispatch = useAppDispatch();
  const curProject = useAppSelector((state) => state.project.current);
  const user = useAppSelector(selectUser);
  const [tutorial, setTutorial] = useState<boolean>(false);

  const fetchProject = async (projectID: string) => {
    const { data } = await api.getProject(projectID);
    dispatch(setCurrentProject(data.data));
  };

  useEffect(() => {
    if (projectID) {
      fetchProject(projectID);
    }
  }, [projectID]);

  useEffect(() => {
    if (curProject) {
      dispatch(setDeveloperStatus(isUserProjectDeveloper(user, curProject)));
    }
  }, [curProject, user]);

  return (
    <>
      {curProject ? (
        <CookiesProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="absolute inset-0 flex items-center justify-center py-12">
            <SearchModal />
          </div>
          <Navbar project={curProject} tutorial={tutorial} setTutorial={setTutorial}/>
          <ContentWrapper>
            <Joyride
              continuous={true}
              run={tutorial}
              // scrollToFirstStep={true}
              hideCloseButton={true}
              showProgress={true}
              showSkipButton={true}
              steps={tutorialSteps}
              styles={{
                options: {
                  zIndex: 10000,
                  arrowColor: "#e3ffeb",
                  // backgroundColor: "#e3ffeb",
                  // overlayColor: "rgba(79, 26, 0, 0.4)",
                  primaryColor: "#99C2A2",
                  // textColor: "#004a14",
                  width: 900,
                },
              }}
            />
            <Sidebar project={curProject} />
            <RouteViewport project={curProject} />
          </ContentWrapper>
        </CookiesProvider>
      ) : (
        <div>No Match</div>
      )}
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-flow: row;
  position: fixed;
  top: 48px;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default ProjectLink;
