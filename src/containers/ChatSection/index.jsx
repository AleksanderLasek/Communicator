import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import EmojiPicker from "emoji-picker-react";
import { convertBase64 } from "../../components/converterBase";
const ChatSection = ({ user, swap }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [image, setImage] = useState('');
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

      console.log(e)

    const file = await convertBase64(e.target.files[0]);
    setImage(file)
  }
  const SendMessage = async () => {
    setMessage("");
    try {
      await axios.post("http://localhost:5000/chat/send", {
        message: message,
        sender: user.email,
        receiver: receiver.email,
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
      <S.ChatWindowWrapper pageTheme={swap}>
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
                  </S.MessageSentWrapper>
                </S.MessageSentLineWrapper>
              );
            } else {
              return (
                <S.MessageReceivedLineWrapper key={index}>
                  <S.MessageReceivedWrapper pageTheme={swap}>
                    {message.message}
                  </S.MessageReceivedWrapper>
                </S.MessageReceivedLineWrapper>
              );
            }
          })}
        </S.MessageWindowWrapper>
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
          <img src={image}/>
          <S.EmojiIcon
            pageTheme={swap}
            className="large smile outline icon"
            onClick={toggleEmojiPanel}
          />

          <S.MessageInput
            pageTheme={swap}
            type="file"
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
