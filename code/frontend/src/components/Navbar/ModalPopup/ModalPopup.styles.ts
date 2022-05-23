import styled from "styled-components";

const ModalContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Error = styled.div`
  padding: 15px 0;
  font-size: 13px;
  color: red;
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
  padding: 40px;
  width: 450px;
  font-size: 26px;
`;

export const MobileModalContainer = styled(ModalContainer)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 16px;
  min-height: 160px;
  font-size: 26px;
`;

export const Header = styled.h3`
  color: black;
  font-size: 28px;
  line-height: 1em;
  font-weight: 300;
  margin: 5px 0 10px;
  text-align: center;
`;

export const Message = styled.p`
  color: #aaa;
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 36px;
  text-align: center;
`;


export const BottomContainer = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.div`
  cursor: pointer;
  border: 3px solid rgb(200, 0, 0);
  font-size: 15px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  padding: 8px 16px;
  line-height: 1em;
  color: rgb(255, 255, 255);
  background-color: rgb(200, 0, 0);

  &:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
  }
`;
