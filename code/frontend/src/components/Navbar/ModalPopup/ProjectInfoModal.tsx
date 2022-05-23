import React, { useState } from "react";
import { Project } from "resources/commonTypes";
import EmailInput from "./EmailInput";

interface ProjectInfoModalProps {
  projectName: string;
  projectId: string;
  project: Project;
  setListOfProjects: Function;
}

// REDUNDANT
const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  projectName,
  projectId,
  project,
  setListOfProjects,
}) => {
  const postPreviewCardStyle =
    "flex flex-row order-l-8 block p-2 hover:bg-gray-200 hover:cursor-pointer bg-white gap-4";

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id={`project-info-modal-${projectId}`}
      aria-labelledby="exampleModalScrollableLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-2xl leading-normal font-black"
              id="exampleModalScrollableLabel"
            >
              Add developers to {projectName}
            </h5>
          </div>
          
          <div className="modal-body relative p-4">
            <EmailInput setListOfProjects={setListOfProjects} project={project} />
          </div>

          <div className="modal-body relative p-4">
            {project.developers.map((developer) => {
              return (
                <div className={postPreviewCardStyle} key={developer.email}>
                  <div className="justify-self-center self-center">
                    {developer.profile_url ? (
                      <div>
                        <img
                          src={developer.profile_url}
                          alt="profile"
                          className="inline object-cover w-12 h-12 rounded-full mr-1"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      defaultIcon
                    )}
                  </div>
                  <div className="flex gap-1 flex-col">
                    <div className="font-bold text-black-900">
                      {developer.first_name} {developer.last_name}
                    </div>
                    <div> {developer.email}</div>
                  </div>
                </div>
              );
            })}
          </div>

          

          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-buggoGreen hover:bg-teal-700 border-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-1"
              data-bs-dismiss="modal"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoModal;
