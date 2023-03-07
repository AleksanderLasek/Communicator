import React, { useState } from "react";
import * as S from "./index.styles";
import jezus from "../../images/jezus.jpg";

const UserPanelSection = () => {
  const [file, setFile] = useState(jezus);

  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <S.Image src={file}  alt=""/>
        <input id="profilePic"  onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} hidden type="file"/>
        <S.EditPictureWrapper htmlFor="profilePic">Edit profile picture</S.EditPictureWrapper>
      </S.ImageWrapper>
      <S.NameWrapper>Alan Pędzistolec</S.NameWrapper>
    </S.Wrapper>
  );
};

export default UserPanelSection;
