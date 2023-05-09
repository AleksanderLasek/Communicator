import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import EmojiPicker from "emoji-picker-react";

const ChatSection =  ({ user, swap, changeLoaded }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [files, setFiles] = useState({
    fileName: '',
    fileId: '',
  });
  const [receiver, setReceiver] = useState({
    name: "",
    surname: "", 
    email: "",
    avatar: "",
  });
  const [chat, setChat] = useState([]);
 
  const [cookie] = useCookies();
  const handleChange = (e) => {
    setMessage(e.target.value); 

  }; 
 
  const getdata = async(file_id, fileName) => { 
    try { 
      const res = await axios.post('http://localhost:5000/files/get', {file_id: file_id}, {responseType: 'blob'});
      console.log(res)
      const mimeType = "image/jpeg";
      const extension = mimeType.split("/")[1];   
      const name = fileName.split(".")[0];
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.${extension}`);
      document.body.appendChild(link);
      link.click();
    }catch(err){  
      console.log(err);  
    } 
  }   

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragV2 = async(e) => {
    e.preventDefault();
    const getF = e.dataTransfer.files[0];
    const file = new FormData();
    file.append("file", e.dataTransfer.files[0]);
    try {
      const res = await axios.post('http://localhost:5000/files/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFiles({fileName: getF.name});
    }catch(err){  
      console.log(err);
    }
  } 
  
  const SendMessage = async () => {
    setMessage("");
    setFiles({fileName: ''})
    try {
      await axios.post("http://localhost:5000/chat/send", {
        message: message,
        sender: user.email,
        receiver: receiver.email,
        fileId: files.fileId,
        fileName: files.fileName
      });
    } catch (err) {
      console.log(err);
    }
  };
  const GetChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        sender: user.email,
        receiver: receiver.email,
      });

      setChat(res.data.Chat);
      changeLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  const AddFriend = async () => {
    try {
      await axios.post("http://localhost:5000/friends/add", {
        name: user.email,
        friendEmail: receiver.email,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const GetFriends = async () => {
    try {
      const res = await axios.post("http://localhost:5000/friends", {
        email: user.email,
      });
      const List = res.data.Friends;
      const emailList = List.map((obj) => obj.friendEmail);
      try {
        const res = await axios.post("http://localhost:5000/users", {
          refreshToken: cookie.refreshToken,
          filter: emailList,
        });
        setFriends(res.data.UsersList);
        ChooseChat(res.data.UsersList[0]);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      GetChat();
    }, 200);
    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    GetFriends();
  }, [user.name]);
  const ChooseChat = (friend) => {
    setReceiver({
      name: friend.name,
      surname: friend.surname,
      avatar: friend.avatar,
      email: friend.email,
    });
  };
  const sendKey = (e) => {
    if (e.key === "Enter") {
      SendMessage();
    }
  };

  //emoji

  const [isEmojiPanel, setIsEmojiPanel] = useState(false);
  const toggleEmojiPanel = () => {
    setIsEmojiPanel((current) => !current);
  };

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  return (
    <S.Wrapper>
      <S.ListWrapper pageTheme={swap}>
        {friends.map((friend, index) => {
          return (
            <S.FriendWrapper
              pageTheme={swap}
              key={index}
              onClick={() => ChooseChat(friend)} 
              style={{ backgroundColor: friend.email === receiver.email }}
            >
              <S.ImageWrapper src={friend.avatar} alt="avatar" />
              <S.FriendNameWrapper pageTheme={swap}>
                {friend.name} {friend.surname} 
              </S.FriendNameWrapper>
            </S.FriendWrapper>
          );
        })}
      </S.ListWrapper>
      <S.ChatWindowWrapper pageTheme={swap} onDrop={handleDragV2} onDragOver={handleDragOver}>
        <S.ChatBarWrapper pageTheme={swap}>
          <S.ChatImageWrapper src={receiver.avatar} alt="avatar" />
          <S.ChatNameWrapper>
            {receiver.name} {receiver.surname}
          </S.ChatNameWrapper>
        </S.ChatBarWrapper>
        <S.MessageWindowWrapper pageTheme={swap}>
          {chat.map((message, index) => {
            if (message.sender === user.name) {
              return (
                <S.MessageSentLineWrapper key={index}>
                  <S.MessageSentWrapper pageTheme={swap}>
                    {message.message}
              
                    {message.fileName && 
                      <>
                      <S.FileMessage onClick={() => getdata(message.fileId, message.fileName)}>{message.fileName}</S.FileMessage>
                      </>
                    }
                  </S.MessageSentWrapper>
                </S.MessageSentLineWrapper>
              );
            } else {
              return (
                <S.MessageReceivedLineWrapper key={index}>
                  <S.MessageReceivedWrapper pageTheme={swap}>
                    {message.message}
                    {message.fileName && 
                      <>
                      <S.FileMessage onClick={getdata(message.fileId, message.fileName)}>{message.fileName}</S.FileMessage>
                      </>
                    }
                   
                  </S.MessageReceivedWrapper>
                </S.MessageReceivedLineWrapper>
              );
            }
          })}
        </S.MessageWindowWrapper>
        {files.fileName !== '' && (
          <S.FilesWrapper>
            <S.FileElement>
              <S.DeleteFileIcon className="small x icon"/>
              {files.fileName}
            </S.FileElement>
          </S.FilesWrapper>
        )}
        <S.MessageTextBox pageTheme={swap}>
          {isEmojiPanel && window.innerWidth > 767 && (
            <S.EmojiContainer>
              <EmojiPicker
                theme={swap ? "light" : "dark"}
                onEmojiClick={handleEmojiSelect}
                searchDisabled
                emojiStyle="google"
              />
            </S.EmojiContainer>
          )}
          {isEmojiPanel && window.innerWidth <= 767 && (
            <S.EmojiContainer>
              <EmojiPicker
                emojiStyle="apple"
                height={450}
                width={350}
                theme={swap ? "light" : "dark"}
                onEmojiClick={handleEmojiSelect}
                searchDisabled
              />
            </S.EmojiContainer>
          )}
          
          <S.EmojiIcon
            pageTheme={swap}
            className="large smile outline icon"
            onClick={toggleEmojiPanel}
          />
          <S.MessageInput
            pageTheme={swap}
            
            value={chosenEmoji ? chosenEmoji.emoji : message}
            onChange={handleChange}
            onKeyPress={sendKey}
          
            
          />

          <S.MessageSentIcon
            pageTheme={swap}
            className="white large paper plane icon"
            onClick={SendMessage}
          />
        </S.MessageTextBox>
      </S.ChatWindowWrapper>
    </S.Wrapper>
  );
};

export default ChatSection;
