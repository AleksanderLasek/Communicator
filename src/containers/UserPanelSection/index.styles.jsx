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
`

export const NameWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
`;

export const Wrapper = styled.div`
  width: 25vw;
  height: auto;
  padding: 10px;
  background-color: #003434;
  position: fixed;
  top: 50px;
  right: 5vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 10px 10px;

  @media screen and (max-width: 768px) {
    background-color: #003946;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
  }
`;
