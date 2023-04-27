import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  left: 5vw;
  color: black;
  display: flex;
  width: 100vw;

  position: relative;
  @media screen and (max-width: 1023px) {
    margin-top: -8vh;
    left: 0;
  }
  @media screen and (max-width: 767px) {
    margin-top: -50px;
  }
`;

export const ListWrapper = styled.div`
  background-color: ${(props) => (props.pageTheme ? "#F7FBFC" : "#202020")};
  width: 25vw;
  height: 85vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0px 0px 5px 3px #00000037;
  border-radius: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  @media screen and (max-width: 1023px) {
    margin-left: 5vw;
  }
  @media screen and (max-width: 767px) {
    margin: 0;
    height: 94vh;
    height: calc(100vh - 50px);
    width: 85px;
    border-radius: 0;
  }
`;

export const FriendWrapper = styled.div`
  height: 8vh;
  min-height: 8vh;
  margin-bottom: 1px;
  width: 100%;
  background-color:  ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
  color: white;
  overflow: hidden;
  box-shadow: 0px 5px 5px -2px #00000060;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FriendNameWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 2vw;
  margin-left: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const ImageWrapper = styled.img`
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
  margin-left: 1vw;

  @media screen and (max-width: 767px) {
    margin: 0;
  }
`;

export const ChatWindowWrapper = styled.div`
  background-color: ${(props) => (props.pageTheme ? "#F7FBFC" : "#202020")};
  width: 60vw;
  height: 85vh;
  box-shadow: 0px 0px 5px 3px #00000037;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
  margin-left: 5vw;
  @media screen and (max-width: 767px) {
    margin-left: 0;
    box-shadow: 0px 0px 5px 3px #00000097;
    height: 94vh;
    height: calc(100vh - 50px);
    width: calc(100vw - 85px);
    border-radius: 0;
  }
`;

export const ChatBarWrapper = styled.div`
  height: 6vh;
  width: 100%;
  background-color: ${(props) => (props.pageTheme ? "#769fcd" : "#14507d")};
  color: white;
  box-shadow: 0px 5px 5px -2px #00000060;
  display: flex;
  border-radius: 15px 15px 0 0;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 767px) {
    height: 9vh;
    border-radius: 0;
  }
`;

export const ChatImageWrapper = styled.img`
  height: 4vh;
  width: 4vh;
  border-radius: 50%;
  margin-left: 1vw;

  @media screen and (max-width: 767px) {
    margin-right: 10px;
  }
`;

export const ChatNameWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 2vw;
  margin-left: 1vw;
`;

export const MessageWindowWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const MessageSentLineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
 
`;

export const MessageReceivedLineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const MessageReceivedWrapper = styled.div`
  background-color: ${(props) => (props.pageTheme ? "#14507d" : "#769FCD")};;
  margin: 5px;
  color: white;
  max-width: 50%;
  padding: 5px 15px;
  border-radius: 15px;
  overflow-wrap: break-word;
  user-select: text;
`;

export const MessageSentWrapper = styled.div`
  background-color: ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
  margin: 5px;
  color: white;
  max-width: 50%;
  padding: 5px 15px;
  border-radius: 15px;
  overflow-wrap: break-word;
  user-select: text;
`;
export const MessageSentIcon = styled.i`
  cursor: pointer;
  transform: scale(1);
  transition: 0.2s ease;
  color: ${(props) => (props.pageTheme ? "#fff" : "#000")};;
  
  &:active {
    transform: scale(1.1);
    transition: 0.2s ease;
  }
`;

export const MessageTextBox = styled.div`
  width: 100%;
  background-color: ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
  display: flex;
  border-radius: 0 0px 15px 15px;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  @media screen and (max-width: 767px) {
    border-radius: 0;
  }
`;
export const MessageInput = styled.input`
  width: 80%;
  padding: 5px 15px;
  font-size: 1.3rem;
  font-family: "Red Hat Display";
  border-radius: 20px;
  border: 0;
  outline: 0;
  background-color: ${(props) => (props.pageTheme ? "#F7FBFC" : "#202020")};;
  color: ${(props) => (props.pageTheme ? "#000" : "#fff")};;
`;
