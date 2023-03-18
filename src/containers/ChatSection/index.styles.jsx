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
  box-shadow: 0px 0px 5px 3px #00000037;
  border-radius: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 0;
  }
`;

export const FriendWrapper = styled.div`
  height: 8vh;
  min-height: 8vh;
  width: 100%;
  background-color: #dff6ff;
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
  box-shadow: 0px 0px 5px 3px #00000037;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
  overflow-y: scroll;
  margin-left: 5vw;
  &::-webkit-scrollbar {
      width: 0;
  }
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
  width: 100%;
  height: 100%;
`;

export const MessageSentLineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
export const MessageReceivedLineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

export const MessageReceivedWrapper = styled.div`
 background-color: #12323f;
  margin: 5px;
  color: white;
  max-width: 50;
  padding: 5px 15px;
  border-radius: 15px;
`;

export const MessageSentWrapper = styled.div`
  background-color: #246883;
  margin: 5px;
  color: white;
  max-width: 50%;
  padding: 5px 15px;
  border-radius: 15px;
`;
export const MessageSentIcon = styled.i`
  cursor: pointer;
  transform: scale(1);
    transition: 0.2s ease;
  &:active{
    transform: scale(1.1);
    transition: 0.2s ease;
  }
`

export const MessageTextBox = styled.div`
  width: 100%;
  background-color: #c7c1c1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
`
export const MessageInput = styled.input`
  width: 80%;
  padding: 5px 15px; 
  font-size: 1.3rem;
  font-family: 'Red Hat Display';
  border-radius: 20px;
  border: 0;
  outline: 0;

`