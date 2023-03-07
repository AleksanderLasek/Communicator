import styled from "styled-components";

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
`;

export const NameWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
`;

export const Wrapper = styled.div`
  width: 25vw;
  height: 200px;
  background-color: #003434;
  position: fixed;
  top: 50px;
  right: 5vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 3% 3%;

  @media screen and (max-width: 768px) {
    background-color: #003946;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
  }
`;
