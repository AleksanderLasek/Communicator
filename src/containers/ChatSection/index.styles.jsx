import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

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
  background-color: ${(props) => (props.pageTheme ? "#e1e1e1" : "#202020")};
  width: 25vw;
  height: 85vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  //box-shadow: 0px 0px 5px 3px #00000037;
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
  background-color: ${(props) => (props.pageTheme ? "#769FCD" : "#14507d")};
  color: white;
  overflow: hidden;
  box-shadow: 0px 5px 5px -2px #00000060;
  display: flex;
  align-items: center;
  justify-content: space-around;

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
  width: 50%;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const ImageWrapper = styled.img`
  max-height: 90%;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 3px #0000003e;
  margin-left: ${(props) => (props.secondImage && "-35%")};
  @media screen and (max-width: 767px) {
    margin: 0;
    margin-left: ${(props) => (props.secondImage && "-60px")};
    
  }
`;

export const ChatWindowWrapper = styled.div`
  background-color: ${(props) => (props.pageTheme ? "#e1e1e1" : "#202020")};
  width: 60vw;
  height: 85vh;
  //box-shadow: 0px 0px 5px 3px #00000037;
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

export const ListBar = styled.div`
  height: 5.5vh;
  width: 100%;
  margin-bottom: 1px;
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
export const ListBarText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 25px;
`
export const ListBarIcon = styled.i`
  color: white;
  cursor: pointer;
`

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
  box-shadow: 0px 0px 5px 3px #00000047;
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
  background-color: ${(props) => (props.pageTheme ? "#14507d" : "#769FCD")};
  margin: 5px;
  color: white;
  max-width: 50%;
  padding: 5px 15px;
  border-radius: 15px;
  overflow-wrap: break-word;
  user-select: text;
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MessageSentIcon = styled.i`
  cursor: pointer;
  transform: scale(1);
  transition: 0.2s ease;
  color: ${(props) => (props.pageTheme ? "#fff" : "#000")};

  &:active {
    transform: scale(1.1);
    transition: 0.2s ease;
  }
`;

export const EmojiIcon = styled.i`
  padding-left: 5px;
  padding-bottom: 13px;

  cursor: pointer;
  transform: scale(1);
  transition: 0.2s ease;
  color: ${(props) => (props.pageTheme ? "#fff" : "#000")};

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
  width: 85%;
  padding: 5px 15px;
  font-size: 1.3rem;
  font-family: "Red Hat Display";
  border-radius: 20px;
  border: 0;
  outline: 0;
  background-color: ${(props) => (props.pageTheme ? "#fff" : "#202020")};
  color: ${(props) => (props.pageTheme ? "#000" : "#fff")};
`;

export const EmojiContainer = styled.div`
  position: absolute;
  bottom: 41px;
  left: 30vw;
  --epr-bg-color: #000000;

  @media screen and (max-width: 1023px) {
    left: 35vw;
  }

  @media screen and (max-width: 767px) {
    position: fixed;
    left: auto;
    right: 0;
  }
`;

export const FilesWrapper = styled.div`
  width: 100%;
  height: 35px;
  background-color: #414141;
  display: flex;
  padding: 5px 5px;
`
export const FileElement = styled.div`
  padding: 0px 10px;
  position: relative;
  border-radius: 5px;
  color: #b8b8b8;
  display: flex;
  background-color: #161616;
  box-shadow: 0px 0px 5px 3px #00000071;
`

export const DeleteFileIcon = styled.i`
  position: absolute;
  right: -4px;
  top: 0px;
`
export const ImageMessage = styled.img`
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`

export const FileMessage = styled.div`
  width: 100%;
  background-color: ${(props) => (props.pageTheme ? "#c5c4c4" : "#303030")};
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px #00000057;
  cursor: pointer;
`
export const shownPhotoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  background-color: #000000dc;

`
export const DownloadIcon = styled.i`
  position: absolute;
  right: 2vw;
  top: 2vw;
  cursor: pointer;
  color: white;
`
export const changePhoto = styled.i`
  position: absolute;
  top: 2vw;
  left: 2vw;
  cursor: pointer;
  color: white;
  z-index: 99999;
`
export const Photo = styled.img`
  position: relative;
  background-color: red;
  z-index: 99999;
  max-width: 80vw;
  max-height: 85vh;
`

export const ChatMakerWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  background-color: #000000ae;
`
export const ChatMaker = styled.div`
  width: 400px;
  height: 440px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

`
export const ChatUsers = styled.div`
  width: 95%;
  background-color: #80808030;
  border-radius: 5px;
  border: 1px solid grey;
  height: 40px;
  display: flex;
  align-items: center;
`
export const ChatUser = styled.div`
  padding: 5px 3px;
  margin-left: 5px;
  background-color: #b8b8b8;
  box-shadow: 0px 0px 5px 3px #00000021;
  color: #272727;
  border-radius: 5px;
`
export const ChatMakerList = styled.div`
  height: 345px;
  width: 95%;
  border-radius: 5px;
  background-color: #b9b9b9;
`
export const ChatMakerListUser = styled.div`
  margin: 5px;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px #00000030;
`
export const CancelUserIcon = styled.i`
 position: relative;
  top: -10px;
  right: -10px;
  color: black;

`
export const PlusIcon = styled.i`
  float: right;
`
export const CreateChatButton = styled.div`
  border: 0;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 5px;
  background-color: #c5c5c5f4;
  box-shadow: 0px 0px 5px 3px #00000049;
  font-weight: bold;
`


