import styled from "styled-components";

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
`;
export const Image = styled.img`
  border-radius: 50%;
  box-shadow: 0px 0px 5px 3px #0000005a;
  max-width: 15vw;
  min-width: 15vw;
  min-height: 15vw;
  max-height: 15vw;
  object-fit: cover;

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 767px) {
    max-width: 35vw;
    min-width: 35vw;
    min-height: 35vw;
    max-height: 35vw;
  }
`;
export const EditPictureWrapper = styled.label`
  padding: 15px;
  color: white;
  z-index: 5;
  cursor: pointer;
`;
export const LogoutButton = styled.div`
  cursor: pointer;
  background-color: white;
  padding: 5px 15px;
  border-radius: 5px;
  font-weight: bold;
  z-index: 5;
  box-shadow: 0px 0px 5px 3px #0000006a;
  transform: scale(1);
  transition: 0.2s ease;
  margin-bottom: 7px;
  &:active {
    transform: scale(1.1);
    transition: 0.2s ease;
  }

  @media screen and (max-width: 767px) {
    margin-top: 10px;
  }
`;

export const NameWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  margin: 10px;
  z-index: 5;
  cursor: default;
  @media screen and (max-width: 767px) {
    margin-bottom: 15px;
  }
`;
export const Text = styled.div`
  font-size: 1.2rem;
  color: white;
  padding: 5px;
  cursor: pointer;
  position: relative;
  z-index: 5;
`;
export const Button = styled.div`
  cursor: pointer;
  padding: 3px 10px;
  margin: 5px;
  background-color: gray;
  color: white;
  border-radius: 5px;
  z-index: 5;
  box-shadow: 0px 0px 5px 3px #00000032;
  transform: scale(1);
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease;
  }
  &:active {
    transform: scale(1.1);
    transition: all 0.05s ease;
  }
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 4;
  opacity: ${(props) => (props.editUser ? "1" : "0")};
  height: ${(props) => (props.editUser ? "140px" : "0")};
  transition: all 0.5s ease;
  margin-bottom: 0px;
  flex-direction: column;
`;
export const Input = styled.input`
  margin: 7px;
  font-family: "Red Hat Display";
  font-size: 1.2rem;
  border-radius: 5px;
  padding: 8px 4px;
  outline: 0;
  border: 0;
  width: 60%;
  @media screen and (max-width: 1023px) {
    font-size: 0.8rem;
    width: 70%;
    padding: 10px 4px;
  }
`;

export const Wrapper = styled.div`
  width: 20vw;
  height: auto;
  box-shadow: 0px 0px 3px 5px #0000002f;

  background-color: ${(props) => (!props.pageTheme ? "#14507d" : "#769FCD")};
  position: fixed;
  overflow: hidden;
  transition: all 0.5s ease;
  right: 5vw;
  z-index: 1;
  display: flex;
  top: 50px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 10px 10px;
  

  @media screen and (max-width: 1023px) {
    top: unset;
    right: 0;
    bottom: 50px;
    border-radius: 10px 0 0 0;
  }

  @media screen and (max-width: 767px) {
    border-radius: 0;
    background-color: ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
    width: 100vw;
    padding-bottom: 50px;
    height: 100vh;
    top: 0;
    right: 0;
    justify-content: center;
  }
`;
