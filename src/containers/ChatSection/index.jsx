import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";

const ChatSection = ({user}) => {
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('test1');
  const [chat, setChat] = useState([]);
  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const SendMessage = async() => {
    try {
      const res = await axios.post('http://localhost:5000/chat/send', {message: message, sender: user.name, receiver: receiver})
      setMessage("")
    }catch(err){
      console.log(err);
    }
  }
  const GetChat = async() => {
    try {
      const res = await axios.post('http://localhost:5000/chat', {sender: user.name, receiver: receiver});
      setChat(res.data.Chat);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
      GetChat();
  })
  return (
    <S.Wrapper>
      <S.ListWrapper> 
        <S.FriendWrapper>
          <S.ImageWrapper src={user.avatar} alt="jezus" />
          <S.FriendNameWrapper>Imie Nazwisko</S.FriendNameWrapper>
        </S.FriendWrapper>
        <S.FriendWrapper>
          <S.ImageWrapper src={user.avatar} alt="jezus" />
          <S.FriendNameWrapper>Andrzej Katamaran</S.FriendNameWrapper>
        </S.FriendWrapper>
      </S.ListWrapper>
      <S.ChatWindowWrapper>
        <S.ChatBarWrapper>
          <S.ChatImageWrapper src={user.avatar} alt="jezus" />
          <S.ChatNameWrapper>Andrzej Katamaran</S.ChatNameWrapper>
        </S.ChatBarWrapper>
        <S.MessageWindowWrapper>
          {chat.reverse().map((message, index) => {
            if(message.sender === user.name) {
              return (
                <S.MessageSentLineWrapper key={index}>
                    <S.MessageSentWrapper>{message.message}</S.MessageSentWrapper>
                </S.MessageSentLineWrapper>
              )
            }else{
              return (
                <S.MessageReceivedLineWrapper key={index}> 
                  <S.MessageReceivedWrapper>{message.message}</S.MessageReceivedWrapper>
                </S.MessageReceivedLineWrapper>
                )
            }
          })}
        </S.MessageWindowWrapper>
        <S.MessageTextBox>
          <S.MessageInput value={message} onChange={handleChange}>

          </S.MessageInput>
          <S.MessageSentIcon className="white large paper plane icon" onClick={SendMessage}/>
        </S.MessageTextBox>
      </S.ChatWindowWrapper>
    </S.Wrapper>
  );
};

export default ChatSection;
