import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import jezus from "../../images/jezus.jpg";

const ChatSection = ({ user }) => {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("test1");
  const [chat, setChat] = useState([]);
  const [friends, setFriends] = useState([]);
  const [delayed, setDelayed] = useState(true);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const SendMessage = async () => {
    setMessage("");
    try {
      await axios.post("http://localhost:5000/chat/send", {
        message: message,
        sender: user.name,
        receiver: receiver,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const GetChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        sender: user.name,
        receiver: receiver,
      });

      setChat(res.data.Chat);
    } catch (err) {
      console.log(err);
    }
  };
  const AddFriend = async () => {
    try {
      await axios.post("http://localhost:5000/friends/add", {
        name: user.name,
        friendName: receiver,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const GetFriends = async () => {
    try {
      const res = await axios.post("http://localhost:5000/friends", {
        name: user.name,
      });
      setFriends(res.data.Friends);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetChat();
  });
  useEffect(() => {
    GetFriends();
  }, [user.name]);
  return (
    <S.Wrapper>
      <S.ListWrapper>
        {friends.map((friend, index) => {
          return (
            <S.FriendWrapper key={index}>
              <S.ImageWrapper src={user.avatar} alt="avatar" />
              <S.FriendNameWrapper>{friend.friendName}</S.FriendNameWrapper>
            </S.FriendWrapper>
          );
        })}

        <S.FriendWrapper>
          <S.ImageWrapper src={jezus} alt="avatar" />
          <S.FriendNameWrapper>Otojest JakisTyp</S.FriendNameWrapper>
        </S.FriendWrapper>
        <S.FriendWrapper>
          <S.ImageWrapper src={jezus} alt="avatar" />
          <S.FriendNameWrapper>Otojest JakisTyp</S.FriendNameWrapper>
        </S.FriendWrapper>
      </S.ListWrapper>
      <S.ChatWindowWrapper>
        <S.ChatBarWrapper>
          <S.ChatImageWrapper src={user.avatar} alt="avatar" />
          <S.ChatNameWrapper>Andrzej Katamaran</S.ChatNameWrapper>
        </S.ChatBarWrapper>
        <S.MessageWindowWrapper>
          {chat.map((message, index) => {
            if (message.sender === user.name) {
              return (
                <S.MessageSentLineWrapper key={index}>
                  <S.MessageSentWrapper>{message.message}</S.MessageSentWrapper>
                </S.MessageSentLineWrapper>
              );
            } else {
              return (
                <S.MessageReceivedLineWrapper key={index}>
                  <S.MessageReceivedWrapper>
                    {message.message}
                  </S.MessageReceivedWrapper>
                </S.MessageReceivedLineWrapper>
              );
            }
          })}
        </S.MessageWindowWrapper>
        <S.MessageTextBox>
          <S.MessageInput value={message} onChange={handleChange} />

          <S.MessageSentIcon
            className="white large paper plane icon"
            onClick={SendMessage}
          />
        </S.MessageTextBox>
      </S.ChatWindowWrapper>
    </S.Wrapper>
  );
};

export default ChatSection;
