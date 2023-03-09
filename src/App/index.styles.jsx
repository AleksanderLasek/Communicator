import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => (props.pageTheme ? "#256D85" : "#071216")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginWrapper = styled.div`
  width: 50vw;
  height: 70%;
  display: flex;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px #00000065;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${(props) => (props.pageTheme ? "#000000b0" : "#b9b9b952")};
  @media screen and (max-width: 768px) {
    width: 100vw;
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
  @media screen and (max-width: 768px) {
    width: 70%;
  }
`;
export const Button = styled.div`
  padding: 8px 20px;
  font-weight: bold;
  border: 0;
  color: black;
  cursor: pointer;
  border-radius: 3px;
  background-color: #89899c9b;
  transform: scale(1);
  transition: 0.1s ease;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s ease;
  }
`;
export const ChangeButton = styled.div`
  font-size: 120%;
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
  color: white;
`;

export const InputsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
