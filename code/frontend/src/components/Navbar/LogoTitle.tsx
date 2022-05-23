import { useAppSelector } from "app/hooks";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Project } from "resources/commonTypes";
import { selectIsOnMobile } from "slices/userSlices";
import Bug from "../../resources/svg/bug.svg";
import Cross from "../../resources/svg/cross.svg";

const LogoTitle: FC<{ project: Project }> = (props) => {
  const navigate = useNavigate();
  const isOnMobile = useAppSelector(selectIsOnMobile);

  const LogoTitleStyle =
    `${isOnMobile ? "flex flex-col" : "flex flex-row"} justify-center my-auto space-x-2 cursor-pointer`;
  const LogoStyle = `${isOnMobile ? "h-8" : "h-14"}`;
  const TitleStyle = `${isOnMobile ? "text-sm w-20 break-words truncate" : "text-2xl pt-3"} font-bold`;
  return (
    <div
      className={LogoTitleStyle}
      onClick={() => {
        navigate("/");
      }}
    >
      <img className={LogoStyle} src={Bug} alt="Buggo" />
      <img className={`${isOnMobile ? "h-2" : ""}`} src={Cross} alt="X" />
      <h5 className={TitleStyle}>{props.project.name}</h5>
    </div>
  );
};

export default LogoTitle;
