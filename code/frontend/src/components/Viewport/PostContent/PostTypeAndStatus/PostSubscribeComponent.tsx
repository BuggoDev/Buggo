import { useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { ReactComponent as BellFilledSvg } from "resources/svg/bell_filled.svg";
import { ReactComponent as BellSvg } from "resources/svg/bell.svg";
import { api } from "resources/api";
import { selectIsOnMobile } from "slices/userSlices";

const PostSubscribeComponent: React.FC<{ postID: string }> = ({ postID }) => {
  const isOnMobile = useAppSelector(selectIsOnMobile)
  const [status, setStatus] = useState(false);

  const initSubscriptionStatus = async () => {
    const { data } = await api.getSubscriptionStatus(postID);
    setStatus(data.status);
  };

  const updateSubscriptionStatus = async () => {
    const { data } = await api.updateSubscriptionStatus(postID, !status);
    setStatus(data.status);
  };

  useEffect(() => {
    initSubscriptionStatus();
  }, [postID]);

  return (
    <div
      className="flex flex-col space-x-2 justify-center hover:cursor-pointer hover:scale-105"
      onClick={updateSubscriptionStatus}
    >
      { status
        ? <BellFilledSvg data-tip="Subscribed"/>
        : <BellSvg data-tip="Not Subscribed"/>
      }
    </div>
  );
};

export default PostSubscribeComponent;
