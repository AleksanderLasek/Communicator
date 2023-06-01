import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 1023px) {
    margin-top: -12vh;
  }
  @media screen and (max-width: 767px) {
    margin-top: -50px;
    justify-content: start;
  }
`;

export const Vita = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 60vw;
  height: 70vh;
  flex-wrap: wrap;

  @media screen and (max-width: 1023px) {
    width: 90vw;
    height: 80vh;
  }
  @media screen and (max-width: 767px) {
    height: 50vh;
  }
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;

  height: 250px;
  width: 200px;
  margin-left: 20px;
  margin-right: 20px;

  @media screen and (max-width: 1023px) {
    
  }

  @media screen and (max-width: 767px) {
    height: 170px;
    width: 115px;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  box-shadow: 0px 0px 5px 3px #0000002b;
  @media screen and (max-width: 1023px) {

  }

  @media screen and (max-width: 767px) {
    height: 115px;
    width: 115px;
  }
`;

export const Name = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  font-size: 1.1rem;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.pageTheme ? "#000" : "#fff")};
`;

export const Label = styled.div`
  font-size: 2rem;
  margin-bottom: 30px;
  color: ${(props) => (props.pageTheme ? "#000" : "#fff")};

@media screen and (max-width: 1023px) {
  margin-top: 70px;
}

@media screen and (max-width: 767px) {
  margin-top: 0;
}
`;
export const Message = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => !props.pageTheme ? "white" : "black"};
`