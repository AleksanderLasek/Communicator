import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./index.styles";
import jezus from "../../images/jezus.jpg";

const ChatSection = () => {
  const [file, setFile] = useState(jezus);

  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.FriendWrapper>
          <S.ImageWrapper src={file} alt="jezus" />
          <S.FriendNameWrapper>Imie Nazwisko</S.FriendNameWrapper>
        </S.FriendWrapper>
        <S.FriendWrapper>
          <S.ImageWrapper src={file} alt="jezus" />
          <S.FriendNameWrapper>Andrzej Kasztan Pajac</S.FriendNameWrapper>
        </S.FriendWrapper>
      </S.ListWrapper>
      <S.ChatWindowWrapper>
        <S.ChatBarWrapper>
          <S.ChatImageWrapper src={file} alt="jezus" />
          <S.ChatNameWrapper>Andrzej Kasztan Pajac</S.ChatNameWrapper>
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
