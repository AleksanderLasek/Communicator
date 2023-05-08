import React from "react";
import * as S from "./index.styles";

const LandingPage = ({swap}) => {
  return (
    <S.Wrapper>
      <S.Label pageTheme={swap}>Recent chats</S.Label>
      <S.Vita>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name pageTheme={swap}>Pajac Jaszczur</S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name pageTheme={swap}>Błazen Kangur</S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name pageTheme={swap}>Ojciec Mateusz</S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name pageTheme={swap}>Spongebob Squarepants</S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name pageTheme={swap}>Kasztan King Kong</S.Name>
        </S.User>
      </S.Vita>
    </S.Wrapper>
  );
};
export default LandingPage;
