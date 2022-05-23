import styled from "styled-components";

const ModalContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Error = styled.div`
  padding: 16px 0;
  font-size: 13px;
  color: black;
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
  padding: 40px;
  width: 450px;
  position: relative;
  font-size: 26px;
`;

export const MobileModalContainer = styled(ModalContainer)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 15px;
  min-height: 150px;
  font-size: 26px;
`;

export const Header = styled.h3`
  color: white;
  font-size: 35px;
  line-height: 1em;
  font-weight: 300;
  margin: 5px 0 10px;
  text-align: center;
`;

export const Message = styled.p`
  color: #aaa;
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 39px;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 15px;
  margin: auto;
  cursor: pointer;
  border: 3px solid white;
  font-size: 16px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  width: 100%;
  padding: 8px 16px;
  line-height: 1em;
  color: white;
  background-color: #99C2A2;

  &:hover {
    color: black;
    background-color: white;
    border-color: white;
  }
`;
