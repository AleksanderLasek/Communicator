import React, { useEffect } from "react";
import * as S from "./index.styles";

const LandingPage = ({changeLoaded}) => {
  useEffect(() => {
    changeLoaded(true);
  }, [])
  return (
    <S.Wrapper>
      <S.Vita>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name></S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name></S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name></S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name></S.Name>
        </S.User>
        <S.User>
          <S.Avatar src="./../../images/default-avatar.png" alt="avatar" />
          <S.Name></S.Name>
        </S.User>
      </S.Vita>
    </S.Wrapper>
  );
};
export default LandingPage;
