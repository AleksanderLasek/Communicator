import styled from "styled-components";

export const LoginWrapper = styled.div`
  width: 50vw;
  height: auto;
  padding: 20px;
  display: flex;
  color: ${(props) => (props.pageTheme ? "#000000" : "#fff")};
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px #00000065;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => (props.pageTheme ? "#F7FBFC" : "#202020")};

  @media screen and (max-width: 1023px) {
    width: 70vw;
    height: 40vh;
  }
  @media screen and (max-width: 767px) {
    width: 90vw;
    height: 40vh;
  }
`;

export const Input = styled.input`
  width: 40%;
  height: 50px;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  font-size: 1.2rem;
  outline: 0;
  font-family: "Red Hat Display", sans-serif;
  border: 0;
  box-shadow: 0px 0px 5px 3px #0000004b;
  background-color: #E8F0FE;


  @media screen and (max-width: 1023px) {
    width: 50%;
  }
  @media screen and (max-width: 767px) {
    width: 60%;
  }
`;

export const Button = styled.div`
  padding: 8px 20px;
  margin-top: 15px;
  font-weight: bold;
  border: 0;
  color: ${(props) => (props.pageTheme ? "#fff" : "#000")};
  cursor: pointer;
  border-radius: 3px;
  background-color: ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
  transform: scale(1);
  transition: 0.1s ease;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s ease;
  }
`;
export const ChangeButton = styled.div`
  font-size: 120%;
  margin-top: 10px;
  cursor: pointer;
  transform: scale(1);
  transition: 0.1s ease;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s ease;
  }
`;
export const WelcomeMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

export const InputsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

