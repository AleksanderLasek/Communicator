import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 50px;
  padding: 0 3vw;
  background-color: ${(props) => (!props.pageTheme ? "#14507d" : "#769FCD")};
  display: flex;
  box-shadow: 0px 0px 5px 3px #0000006e;
  justify-content: space-around;
  align-items: center;
  color: white;
  z-index: 99;

  @media screen and (max-width: 1023px) {
    bottom: 0;
    padding: 0;
  }
  @media screen and (max-width: 767px) {
    flex-direction: row-reverse;
  }
`;

export const LogoWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterWrapper = styled.div`
  display: flex;
  font-weight: bold;
  width: 45%;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2rem;
  @media screen and (max-width: 1023px) {
    width: 70%;
    font-size: 1rem;
  }
`;
export const RightWrapper = styled.div`
  display: flex;
  width: 20%;
  font-size: 0.9vw;
  align-items: center;
  justify-content: space-around;
`;

export const Button = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #0000004c;
`;
export const SignInText = styled.div`
  font-size: 0.9vw;
`;
export const CheckBoxWrapper = styled.div`
  position: relative;
  @media screen and (max-width: 1023px) {
    margin-right: 2vw;
    margin-left: 2vw;
  }
  @media screen and (max-width: 767px) {
    margin-left: 4vw;
  }
`;
export const CheckBoxLabel = styled.label`
  position: absolute;
  right: 0;
  width: 50px;
  height: 30px;
  border-radius: 15px;
  background: #525252;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 23px;
    height: 23px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #3b8300c5;
    &::after {
      content: "";
      display: block;
      background-color: #f0f0f0;
      border-radius: 50%;
      width: 23px;
      height: 23px;
      margin-left: 24px;
      transition: 0.2s;
    }
  }
`;

export const AWrapper = styled.a`
  color: white;
  &:hover {
    color: #aaaaaa;
  }

  display: flex;
  align-items: center;
`;

export const MobileLogo = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-left: 25vw;
  margin-top: 7vh;
`;
const yellow = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const Icon = styled.i`
  color: ${({ mode }) => (mode ? "#FFC107" : "#757575")};
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${({ mode }) => (mode ? "#FFA000" : "#616161")};
  }

  &:active {
    animation: ${({ mode }) => (mode ? yellow : null)} 0.3s ease-in-out;
  }
`;

export const NotsNumberNot = styled.div`
  background-color: red;
  width: 25px;
  box-shadow: 0px 0px 5px 3px #00000063;
  align-items: center;
  height: 25px;
  color: #c5c1c1;
  display: flex;
  justify-content: center;
  position: sticky;
  margin-left: -3px;
  z-index: 1;
  margin-top: -10px;
  border-radius: 50%;
`;
