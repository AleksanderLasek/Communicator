import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  left: 5vw;
  color: black;
  display: flex;
  width: 100vw;
  position: relative;
`;

export const ListWrapper = styled.div`
  background-color: white;
  width: 25vw;
  height: 85vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 2%;
  overflow-y: scroll;
`;

export const FriendWrapper = styled.div`
  height: 8vh;
  min-height: 8vh;
  width: 100%;
  background-color: #dff6ff;
  border-radius: inherit;
  overflow: hidden;
  border: 1px solid #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const FriendNameWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 2vw;
  margin-left: 2vw;
`;

export const ImageWrapper = styled.img`
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
  margin-left: 2vw;
`;

export const ChatWindowWrapper = styled.div`
  background-color: white;
  width: 60vw;
  height: 85vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 2%;
  overflow-y: scroll;
  margin-left: 5vw;
`;

export const ChatBarWrapper = styled.div`
  height: 6vh;
  width: 100%;
  background-color: #dff6ff;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ChatImageWrapper = styled.img`
  height: 4vh;
  width: 4vh;
  border-radius: 50%;
  margin-left: 1vw;
`;

export const ChatNameWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 2vw;
  margin-left: 1vw;
`;

export const MessageWindowWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

export const MessageReceivedWrapper = styled.div`
  background-color: #06283d;
  width: 10vh;
  height: 3vw;
  margin-left: 1vw;
  margin-top: 1vh;
  border-radius: 20%;
`;

export const MessageSentWrapper = styled.div`
  background-color: #000000;
  width: 10vh;
  height: 3vw;
  position: relative;
  margin-left: 1vw;
  margin-top: 1vh;
  border-radius: 20%;
`;
