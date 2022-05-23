import { FC, useEffect, useState } from "react";
import { selectIsOnMobile, selectUser } from "slices/userSlices";
import { Octokit } from "@octokit/core";
import { useAppSelector, useAppDispatch } from "app/hooks";
import RepositoryListPopup from "./RepositoryListPopup";
import { updateRepositories } from "slices/githubSlice";
import { Project } from "resources/commonTypes";
import { ReactComponent as GithubSvg } from "resources/svg/github.svg";

const ImportButton: FC<{ project: Project }> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isOnMobile = useAppSelector(selectIsOnMobile);
  const [displayList, setDisplayList] = useState<boolean>(false);

  const retrieveGitRepos = (octokit: Octokit) => {
    octokit
      .request("GET /user/repos", {})
      .then(({ data }) => {
        dispatch(updateRepositories(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.provider == "github") {
      const gitToken = localStorage.getItem("gitAccessToken");
      const octokit = new Octokit({ auth: `${gitToken}` });

      retrieveGitRepos(octokit);
    }
  }, []);

  const handleImportClick = async () => {
    setDisplayList(!displayList);
  };
  return (
    <>
      <div className={`${isOnMobile ? "pt-6" : "pt-2"}`}>
        < GithubSvg
          // className={`${isOnMobile ? "w-15 text-[8px] h-5" : "w-20 h-8"} self-center px-2 rounded-md bg-[#6e5494]`}
          className="hover:cursor-pointer hover:scale-110"
          onClick={handleImportClick}
        />
        {displayList ? (
          <RepositoryListPopup
            handleImportClick={handleImportClick}
            project={props.project}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ImportButton;
