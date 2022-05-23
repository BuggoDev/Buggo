import { useAppDispatch } from "app/hooks";
import { useCookies } from "react-cookie";
// @ts-ignore
import LoginGithub from "react-login-github";
import { api } from "resources/api";
import { updateUser } from "slices/userSlices";
import github from "../../../resources/svg/github.svg";

const GithubAuth = () => {
  const dispatch = useAppDispatch();
  const [_, setCookie] = useCookies(["token"]);

  const onGithubSuccess = async (response: any) => {
    const { data } = await api.githubGetToken(response.code);
    localStorage.setItem("gitAccessToken", data.access_token);
    api
      .githubSignin(data)
      .then(({ data }) => {
        dispatch(updateUser(data.user));
        setCookie("token", data.token, { path: "/", maxAge: 3600 });
      })
      .catch((err) => {});
  };

  const onGithubFailure = () => {};
  return (
    <div className="drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.40)] text-[#0000008a] inline-block border: 1px font-weight: 500 flex px-2.5 py-3 bg-white text-black font-medium text-sm leading-tight uppercase rounded-sm">
      <img src={github} className="h-5 mr-4"></img>
      <LoginGithub
        clientId={process.env.REACT_APP_GITHUB_CLIENT_ID!}
        onSuccess={onGithubSuccess}
        onFailure={onGithubFailure}
        buttonText="Continue with GitHub"
        scope={"repo user"}
      />
    </div>
  );
};

export default GithubAuth;
