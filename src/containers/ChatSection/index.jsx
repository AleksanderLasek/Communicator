import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import EmojiPicker from "emoji-picker-react";
import { convertBase64 } from "../../components/converterBase";
import { createCanvas, loadImage } from "canvas";
import { scaleImage } from "../../components/scaleImage";
const ChatSection = ({ user, swap, changeLoaded }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [image, setImage] = useState({
    src: '',
    miniature: '',
    fileName: ''
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
  const handleDrag = async(e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
  
    const convertedImage = await convertBase64(file);
    const img = new Image();
    img.onload = async () => {
      const maxWidth =  768;
      const maxHeight = 1366;
      const canvas = createCanvas(maxWidth, maxHeight);
      const ctx = canvas.getContext("2d");
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
  
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
      ctx.drawImage(
        img, 
        0,
        0, 
        width,
        height
      );
      const outputBase64 = canvas.toDataURL();
      const miniature = await scaleImage(convertedImage, 200, 200);
      let splitFileName = file.name.split('.');
      let fileName = splitFileName[0].slice(0, 15);
      if(fileName.length === 15){
        fileName = fileName + '...';
      }
      fileName = fileName + '.' + splitFileName[1];
      setImage({
        fileName: fileName, 
        src: outputBase64, 
        miniature: miniature
      })
    };
    img.src = convertedImage;
  }
  useEffect(() => {
    const apiKey = '1yWvQtmB2arIKAF27SmR9D1jOrdKPAIxx7u6GVkQPDPk'; // API klucz

    fetch(`https://www.googleapis.com/drive/v2/files/${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(":)")
        console.log(data.files);
      })   
      .catch(error => {  
        console.error(error);
      });
  }, [user.email]);
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  const SendMessage = async () => {
    setMessage("");
    setImage({src: '', fileName: ''})
    try {
      await axios.post("http://localhost:5000/chat/send", {
        message: message,
        sender: user.email,
        receiver: receiver.email,
        image: image.src,
        miniature: image.miniature
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
      <S.ChatWindowWrapper pageTheme={swap} onDrop={handleDrag} onDragOver={handleDragOver}>
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
                    {message.miniature && (
                      <S.ImageMessage src={message.miniature}/>
                    )}
                  </S.MessageSentWrapper>
                </S.MessageSentLineWrapper>
              );
            } else {
              return (
                <S.MessageReceivedLineWrapper key={index}>
                  <S.MessageReceivedWrapper pageTheme={swap}>
                    {message.message}
                    {message.miniature && (
                      <S.ImageMessage src={message.miniature}/>
                    )}
                  </S.MessageReceivedWrapper>
                </S.MessageReceivedLineWrapper>
              );
            }
          })}
        </S.MessageWindowWrapper>
        {image.src !== '' && (
          <S.FilesWrapper>
            <S.FileElement>
              <S.DeleteFileIcon className="small x icon"/>
              {image.fileName}
            </S.FileElement>
          </S.FilesWrapper>
        )}
        <S.MessageTextBox>
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
            onDrop={handleDrag}
            
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
