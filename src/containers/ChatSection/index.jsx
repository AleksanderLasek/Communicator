import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./index.styles";
import jezus from "../../images/jezus.jpg";

const ChatSection = ({user}) => {
  const [file, setFile] = useState(jezus);

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
          <S.MessageReceivedLineWrapper>
            <S.MessageReceivedWrapper>chuj</S.MessageReceivedWrapper>
          </S.MessageReceivedLineWrapper>
          <S.MessageSentLineWrapper>
            <S.MessageSentWrapper>sam zes jest chuj</S.MessageSentWrapper>
          </S.MessageSentLineWrapper>
          <S.MessageReceivedLineWrapper>
            <S.MessageReceivedWrapper>ok</S.MessageReceivedWrapper>
          </S.MessageReceivedLineWrapper>
        </S.MessageWindowWrapper>
        <S.MessageTextBox>
          <S.MessageInput type="text">

          </S.MessageInput>
          <S.MessageSentIcon className="white large paper plane icon"/>
        </S.MessageTextBox>
      </S.ChatWindowWrapper>
    </S.Wrapper>
  );
};

export default ChatSection;
