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
    @media screen and (max-width: 768px){
      max-width: 35vw;
      min-width: 35vw;
      min-height: 35vw;
      max-height: 35vw;
    }
    
`
export const EditPictureWrapper = styled.label`
    padding: 15px;
    color: white;
    z-index: 5;
    cursor: pointer;
`

export const NameWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  margin: 10px;
  z-index: 5;
  cursor: default;
`;
export const Text = styled.div`
  font-size: 1.2rem;
  color: white;
  padding: 5px;
  cursor: pointer;
  position: relative;
  z-index: 5;
`
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
  &:hover{
    transform: scale(1.05);
    transition: all 0.2s ease;
  }
  &:active{
    transform: scale(1.10);
    transition: all 0.05s ease;
  }
`
export const InputWrapper = styled.div`
    position: relative;
    display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 4;
  opacity: ${(props) => props.editUser ? "1" : "0"};
  height: ${(props) => props.editUser ? "140px" : "0" };
  transition: all 0.5s ease;
  margin-bottom: 0px;
  flex-direction: column;
`
export const Input = styled.input`
    margin: 7px;
    font-family: 'Red Hat Display';
    font-size: 1.2rem;
    border-radius: 5px;
    padding: 8px 4px; 
    outline: 0;
    border: 0;
    width: 60%;
`

export const Wrapper = styled.div`
  width: 25vw;
  height: auto;
  box-shadow: 0px 0px 3px 5px #0000002f;
  
  background-color: #052133;
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
  @media screen and (max-width: 768px) {
    background-color: #03333a;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
  }
`;
