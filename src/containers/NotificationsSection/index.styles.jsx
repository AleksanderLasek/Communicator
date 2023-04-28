import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  width: 100vw;
  height: 99.7vh;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;

  @media screen and (max-width: 1023px) {
    justify-content: end;
    margin-top: 0;
    margin-bottom: 0.3vh;
  }

  @media screen and (max-width: 767px) {
  }
`;

export const Notification = styled.div`
  max-width: 70vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 70px;
  color: white;
  border-radius: 7px;
  box-shadow: 0px 0px 5px 3px #0000003e;
  background-color: ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
  margin: 5px;

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 767px) {
    min-width: 98vw;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
  margin-left: 20px;
`;

export const Text = styled.div`
  max-width: 50vw;
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const DateText = styled.div`
  margin-right: 20px;
`;
