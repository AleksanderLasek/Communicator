import React from "react";
import * as S from "./index.styles";
import jezus from "../../images/jezus.jpg";

const UserPanelSection = () => {
  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <img
          src={jezus}
          alt="jezus"
          width="50%"
          style={{ borderRadius: "50%" }}
        />
      </S.ImageWrapper>
      <S.NameWrapper>Alan Pędzistolec</S.NameWrapper>
    </S.Wrapper>
  );
};

export default UserPanelSection;
