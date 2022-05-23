import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectRepositories } from "slices/githubSlice";
import { Octokit } from "@octokit/core";
import { Project, PostType } from "resources/commonTypes";
import { api } from "resources/api";
import { updatePosts } from "slices/postsSlice";
import { ReactComponent as XSvg } from "../../../resources/svg/x.svg";
import { toast } from "react-toastify";

const RepositoryListPopup: FC<{ handleImportClick: any; project: Project }> = (
  props
) => {
  const dispatch = useAppDispatch();
  const repos = useAppSelector(selectRepositories);
  const [nextSlide, setNextSlide] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const [issuesDisplayed, setIssuesDisplayed] = useState<any[]>([]);
  const [issuesComments, setIssuesComments] = useState<any[][]>([]);

  const REPO_PER_PAGE = 4;
  const numPaginations = Math.ceil(repos.length / REPO_PER_PAGE);

  const nextSlideF = (owner: string, repo: string) => {
    const gitToken = localStorage.getItem("gitAccessToken");
    const octokit = new Octokit({ auth: `${gitToken}` });

    octokit
      .request(`GET /repos/${owner}/${repo}/issues`, {
        owner: owner,
        repo: repo,
      })
      .then(({ data }) => {
        if (data.length === 0) {
          toast.error("There are no github issues to import for this repository!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setNextSlide(false);
          throw new Error("Error mark");
        }
        setIssuesDisplayed(data);
        for (const issue of data) {
          const issue_number = issue.number;
          octokit
            .request(
              `GET /repos/${owner}/${repo}/issues/${issue_number}/comments`,
              {
                owner: owner,
                repo: repo,
              }
            )
            .then(({ data }) => {
              let temp = issuesComments;
              temp.push(data);
              setIssuesComments(temp);
              setNextSlide(!nextSlide);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConfirm = async () => {
    const postData = await api.importIssues(
      issuesDisplayed,
      props.project,
      PostType.BugReport
    );

    const res = await api.importComments(
      postData.data.allPosts,
      issuesComments,
      props.project.id
    );

    dispatch(updatePosts(res.data.data));
    props.handleImportClick();
  };

  const activatePagination = (newNum: number) => {
    setCurrPage(newNum);
  };
  return (
    <>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="pt-1">
              <XSvg
                onClick={() => {
                  props.handleImportClick();
                }}
              />
            </div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col">
                <div className="p-2 w-full">
                  <div className="pb-4">
                    {/*List the repos*/}
                    {!nextSlide ? (
                      <>
                        {[...Array(REPO_PER_PAGE)].map((e, num) => {
                          const repo_index =
                            num + (currPage - 1) * REPO_PER_PAGE;
                          return (
                            <div className="pb-4" key={num}>
                              {repo_index < repos.length ? (
                                <button
                                  onClick={() => {
                                    nextSlideF(
                                      repos[repo_index].owner.login,
                                      repos[repo_index].name
                                    );
                                  }}
                                  className={`bg-gray-100 rounded flex transition-all ease-in-out duration-500 transform ${
                                    ""
                                    /*!nextSlide
                                    ? "translate-x-0"
                                    : "-translate-x-[30rem]"*/
                                  } p-4 h-12 w-full items-center`}
                                >
                                  <span className="title-font font-medium">
                                    {repos[repo_index].full_name}
                                  </span>
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                    {/*List the Issues */}
                    {nextSlide ? (
                      <>
                        <div className="pb-4">
                          {issuesDisplayed.map((issue) => {
                            return (
                              <div className="pb-4" key={issue.id}>
                                <div
                                  className={`bg-gray-100 rounded flex transition-all ease-in-out duration-500 transform ${
                                    ""
                                    /*!nextSlide
                                      ? "-translate-x-[30rem]"
                                      : "translate-x-0"*/
                                  } p-4 h-full w-full items-center`}
                                >
                                  <span className="title-font font-medium">
                                    {issue.title}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/*pagination */}
                  {!nextSlide ? (
                    <>
                      <nav
                        className={`flex items-center justify-center transition-all ease-in-out duration-500 transform ${
                          "" /*!nextSlide ? "translate-x-0" : "-translate-x-[30rem]"*/
                        }`}
                        aria-label="Page navigation example"
                      >
                        <ul className="inline-flex -space-x-px">
                          {[...Array(numPaginations)].map((e, i) => {
                            const wasSelected = currPage === i + 1;
                            return (
                              <li key={i}>
                                <button
                                  onClick={() => {
                                    activatePagination(i + 1);
                                  }}
                                  className={`py-2 px-3 leading-tight ${
                                    wasSelected
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-white text-gray-500"
                                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >
                                  {i + 1}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </nav>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center pb-2">
              <button
                onClick={handleConfirm}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-white bg-[#99C2A2] text-base font-medium hover:bg-[#74997c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm outline-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepositoryListPopup;
