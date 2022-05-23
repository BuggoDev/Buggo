import { FC, useEffect, useState } from "react";
import { selectUser, updateUser } from "../../slices/userSlices";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { api } from "../../resources/api";
import { Project } from "resources/commonTypes";
import userAdd from "../../resources/svg/userAdd.svg";
import Header from "components/Dashboard/Header";
import ProjectInfoModal from "components/Navbar/ModalPopup/ProjectInfoModal";

const Dashboard: FC<{}> = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [listOfProjects, setListOfProjects] = useState<Project[]>([]);

  const fetchUserProjects = () => {
    api
      .getAllUserProjects()
      .then((resTwo) => {
        const temp = resTwo.data;
        setListOfProjects([...temp]);
      })
      .catch((err) => {
        // display an alert to user
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserProjects();
  }, [user]);

  const redirectProjectPage = () => {
    let path = "createProject";
    navigate(`../${path}`);
  };

  const generalRedirect = (id: string) => {
    navigate(`../${id}`);
  };

  return (
    <>
      <Header />
      {user.email !== "noUser" ? (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Your Buggos
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                Click on any of your Buggos and you will be redirected.
              </p>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {listOfProjects.map((project) => {
                return (
                  <div className="p-2 sm:w-1/2 w-full flex" key={project.id}>
                    <button
                      onClick={() => {
                        generalRedirect(project.id);
                      }}
                      className="bg-gray-100 rounded-l-lg flex p-4 h-full w-full items-center"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        className="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <span className="title-font font-medium">
                        {project.name}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="bg-gray-100 rounded-r-lg p-4 items-center"
                      data-bs-toggle="modal"
                      data-bs-target={`#project-info-modal-${project.id}`}
                    >
                      <img src={userAdd} className="h-5 mr-4 hover:scale-[1.2] ease-in duration-100"></img>
                    </button>
                    <ProjectInfoModal
                      setListOfProjects={setListOfProjects}
                      project={project}
                      projectId={project.id}
                      projectName={project.name}
                    ></ProjectInfoModal>
                  </div>
                );
              })}
            </div>

            <button
              onClick={redirectProjectPage}
              className="flex mx-auto mt-16 text-white bg-buggoGreen border-0 py-2 px-8 focus:outline-none hover:bg-buggoGreen-600 rounded text-lg"
            >
              Create a Project
            </button>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
