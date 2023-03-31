import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";

const ChatSection = ({ user }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
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
          const res = await axios.post('http://localhost:5000/users', {refreshToken: cookie.refreshToken, filter: emailList})
          setFriends(res.data.UsersList)
          ChooseChat(res.data.UsersList[0]);
      }catch(err){
        console.log(err)
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
    }
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
    })
  }
  const sendKey = (e) => {
    if(e.key === 'Enter'){
      SendMessage();
    }
  }
  return (
    <S.Wrapper>
      <S.ListWrapper>
        {friends.map((friend, index) => {
          return (
            <S.FriendWrapper key={index} onClick={() => ChooseChat(friend)} style={{backgroundColor: friend.email === receiver.email && "#03141f"}}>
              <S.ImageWrapper src={friend.avatar} alt="avatar" />
              <S.FriendNameWrapper>{friend.name} {friend.surname}</S.FriendNameWrapper>
            </S.FriendWrapper>
          );
        })}
      </S.ListWrapper>
      <S.ChatWindowWrapper>
        <S.ChatBarWrapper>
          <S.ChatImageWrapper src={receiver.avatar} alt="avatar" />
          <S.ChatNameWrapper>{receiver.name} {receiver.surname}</S.ChatNameWrapper>
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
          <S.MessageInput value={message} onChange={handleChange} onKeyPress={sendKey}/>

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
