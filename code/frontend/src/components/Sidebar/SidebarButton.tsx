import React from "react";

import { Theme } from "@buggo/ui";

import styled from "styled-components";

interface IProps {
  name: string;
  link: string;
}

const SidebarButton =(props:IProps) => {
  return (
    <div>
      <ButtonContainer>{props.name}</ButtonContainer>
    </div>
  );
}


const ButtonContainer = styled.div`
  height: ${Theme.layout.sideBarButtonHeight};
  background-color: ${Theme.colors.grey2};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

export default SidebarButton;



