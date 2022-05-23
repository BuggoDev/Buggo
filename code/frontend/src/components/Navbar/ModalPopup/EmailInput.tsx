import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "resources/api";
import { Project } from "resources/commonTypes";

interface EmailInputPros {
  project: Project;
  setListOfProjects: Function;
}

const EmailInput: React.FC<EmailInputPros> = ({
  project,
  setListOfProjects,
}) => {
  const [inputEmail, setInputEmail] = useState("");
  const addHandler = () => {
    api
      .addDeveloper(inputEmail, project.id)
      .then(({ data }) => {
        setInputEmail("");
        setListOfProjects(data);
        toast.success("Developer added!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // dispatch(updateUser(data.user));
        // setCookie("token", data.token, { path: "/", maxAge: 3600 });
      })
      .catch((err) =>
        err.response.data.errors.map((e: any) => {
          console.log(e);
          toast.error(e.message, {
            position: "bottom-right",
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
    <form>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          onChange={(e) => setInputEmail(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-transparent focus:border-transparent focus:ring-0"
          type="text"
          placeholder="Developer Email"
          value={inputEmail}
        />
        <button
          onClick={addHandler}
          className="flex-shrink-0 bg-buggoGreen hover:bg-teal-700 border-teal-500 text-sm  text-white py-1 px-2 rounded"
          type="button"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default EmailInput;
