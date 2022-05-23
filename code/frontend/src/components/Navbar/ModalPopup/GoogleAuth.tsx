import { useAppDispatch } from "app/hooks";
import { useCookies } from "react-cookie";
import { GoogleLogin } from "react-google-login";
import { api } from "resources/api";
import { updateUser } from "slices/userSlices";

const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(["token"]);

  const onGoogleSuccess = (response: any) => {
    const access_token = response.accessToken;
    api
      .googleSignin(access_token)
      .then(({ data }) => {
        dispatch(updateUser(data.user));
        setCookie("token", data.token, { path: "/", maxAge: 3600 });
      })
      .catch((err) => {});
  };
  const onGoogleFailure = () => {};
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
      onSuccess={onGoogleSuccess}
      onFailure={onGoogleFailure}
      className="google-login-button"
      buttonText="Continue with Google"
    />
  );
};

export default GoogleAuth;
