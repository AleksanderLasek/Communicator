import React, { useState } from "react";
import * as S from "./index.styles";
import jezus from "../../images/jezus.jpg";

const UserPanelSection = () => {
  const [file, setFile] = useState(jezus);
  const [editUser, setEditUser] = useState(false);
  const handleFile = (e) => {
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleEditUser = () => {
    setEditUser(current => !current);
  }
  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <S.Image src={file} alt=""/>
        <input id="profilePic"  onChange={handleFile} hidden type="file"/>
        <S.EditPictureWrapper htmlFor="profilePic">Edit profile picture</S.EditPictureWrapper>
      </S.ImageWrapper>
        <S.Text onClick={handleEditUser}>Edit name</S.Text>
        <S.InputWrapper editUser={editUser}>
          <S.Input placeholder="Enter new name"/>
          <S.Input placeholder="Enter new surname"/>
          <S.Button>Submit</S.Button>
        </S.InputWrapper>
      
     
      <S.NameWrapper >John Doe</S.NameWrapper>
      
    </S.Wrapper>
  );
};

export default UserPanelSection;
