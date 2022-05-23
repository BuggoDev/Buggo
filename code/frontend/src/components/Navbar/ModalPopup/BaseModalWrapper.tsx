import React, { ReactNode } from "react";
import Modal from "./Modal";
import { DesktopModalContainer, Header } from "./ModalPopup.styles";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  content?: ReactNode;
  overrideStyle?: boolean;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
  header,
  content,
  children,
  overrideStyle,
}) => {
  if (!isModalVisible) {
    return null;
  }
  return (
    <Modal onBackdropClick={onBackdropClick}>
      {overrideStyle ? (
        <div>
          {content}
          {children}
        </div>
      ) : (
        <DesktopModalContainer>
          <Header>{header}</Header>
          {content}
          {children}
        </DesktopModalContainer>
      )}
    </Modal>
  );
};

export default BaseModalWrapper;
