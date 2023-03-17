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
          <S.MessageReceivedWrapper></S.MessageReceivedWrapper>
          <S.MessageSentWrapper></S.MessageSentWrapper>
        </S.MessageWindowWrapper>
      </S.ChatWindowWrapper>
    </S.Wrapper>
  );
};

export default ChatSection;
