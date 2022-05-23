import { useAppSelector } from "app/hooks";
import React from "react";
import { useLocation } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { selectIsOnMobile } from "slices/userSlices";
import BaseModalWrapper from "./BaseModalWrapper";
import { Header } from "./ModalPopup.styles";

interface ProjectSettingsModalProps {
  onBackdropClick: () => void;
  isProjectSettingsModalVisible: boolean;
}

const ProjectSettingsModal: React.FC<ProjectSettingsModalProps> = ({
  isProjectSettingsModalVisible,
  onBackdropClick,
}) => {
  const location = useLocation();
  const isOnMobile = useAppSelector(selectIsOnMobile);

  const code = `<script>
    window.buggoConfig = {
      project: "${location.pathname.split("/")[1]}",
      btnBgColor: "rgb(240, 240, 240)",
      btnBgHoverColor: "rgb(220, 220, 220)",
    };
</script>
<script>
  (function (d) {
    var s = d.createElement("script");
    (s.async = 1), (s.src = "https://cdn.buggo.org/integration/buggo.js");
    var i = d.getElementsByTagName("script")[0];
    i.parentNode.insertBefore(s, i);
  })(document);
</script>`;

  return (
    <BaseModalWrapper
      onBackdropClick={onBackdropClick}
      isModalVisible={isProjectSettingsModalVisible}
      header=""
      content={
        <div className={`${isOnMobile ? "text-[6px]" : ""} w-auto bg-white px-5 py-5 rounded-md`}>
          <Header>Buggo Integration</Header>
          <p className="text-slate-900 mt-5 mb-2">
            Copy the below script to your app to add an interactive widget!
          </p>
          <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
        </div>
      }
      overrideStyle
    />
  );
};

export default ProjectSettingsModal;
