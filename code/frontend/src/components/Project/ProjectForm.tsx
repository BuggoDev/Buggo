import { FC, useState } from "react";
import { api } from "resources/api";
import { selectUser } from "../../slices/userSlices";
import { useAppSelector } from "app/hooks";
import { ToastContainer, toast } from "react-toastify";
import Header from "components/Dashboard/Header";
import { useNavigate } from "react-router-dom";

const ProjectForm: FC = (props) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [projectName, setProjectName] = useState<string>("");
  const [urlLogo, setUrlLogo] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  let homePath = window.location.href.split("/createProject")[0];

  const handleClick = async () => {
    if (user && user.email !== "noUser") {
      api
        .createProject(projectName, urlLogo, user.email!)
        .then(({ data }) => {
          setID(data.data.id);
          setClicked(true);
          setProjectName("");
          setUrlLogo("");
          let path = "myProjects";
          navigate(`../${path}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Something is wrong, you're not logged in!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Header />
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
              <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                  <div className="relative">
                    <p className="mb-2 font-medium text-gray-700 uppercase">
                      Get the best pest control
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                      Create and develop your projects responsibly
                    </h2>
                  </div>
                  <p className="text-2xl text-gray-700">
                    We created a simple formula to get more out of your business
                    and application.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full bg-white lg:w-6/12 xl:w-5/12">
              <div className="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
                <h4 className="w-full text-3xl font-bold">
                  Create your Project
                </h4>
                <div className="relative w-full mt-10 space-y-8">
                  <div className="relative">
                    <label className="font-medium text-gray-900">
                      Name of Project
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your Project's Name"
                      onChange={(event) => {
                        setProjectName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="relative">
                    {!clicked ? (
                      <>
                        <button
                          className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-buggoGreen rounded-lg hover:bg-green-700 ease"
                          onClick={handleClick}
                        >
                          Create Project
                        </button>
                        <ToastContainer />
                      </>
                    ) : (
                      <a
                        href={`${homePath}/${ID}`}
                        className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-700 ease"
                      >
                        Go to Your Project!
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectForm;
