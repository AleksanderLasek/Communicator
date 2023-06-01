import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import defaultAvatar from "../../images/default-avatar.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import AvatarEditor from "react-avatar-editor";
import { createCanvas, loadImage } from "canvas";
import { convertBase64 } from "../../components/converterBase";

const UserPanelSection = ({ user, pageTheme }) => {
  const [file, setFile] = useState(user.avatar);
  const [editUser, setEditUser] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cookie, setCookies, removeCookies] = useCookies(["refreshToken"]);
  const handleFile = async (e) => {
    e.preventDefault();
    const convertedImage = await convertBase64(e.target.files[0]);
    setFile(convertedImage);

    const token = cookie.refreshToken;
    console.log(token);
    const outputWidth = 400;
    const outputHeight = 400;
    const canvas = createCanvas(outputWidth, outputHeight);
    const ctx = canvas.getContext("2d");
    const img = await loadImage(convertedImage);
    const originalWidth = img.width;
    const originalHeight = img.height;
    const cropSize = Math.min(originalWidth, originalHeight);
    const cropX = (originalWidth - cropSize) / 2;
    const cropY = (originalHeight - cropSize) / 2;
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropSize,
      cropSize,
      0,
      0,
      outputWidth,
      outputHeight
    );
    const outputBase64 = canvas.toDataURL();
    setAvatar(outputBase64);
    console.log(outputBase64);
  };

  const handleEditUser = () => {
    setEditUser((current) => !current);
  };
  const handleNameChange = async (e) => {
    e.preventDefault();
    const token = cookie.refreshToken;
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/users/edit`, {
        refreshToken: token,
        name: name,
        surname: surname,
      });
      console.log(res);
      setEditUser(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAvatarChange = async (e) => {
    e.preventDefault();
    const token = cookie.refreshToken;
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/users/edit`, {
        refreshToken: token,
        avatar: avatar,
      });
      console.log(res);
      setAvatar("");
    } catch (err) {
      console.log(err);
    }
  };
  
  const Logout = () => {
    window.location.assign("/")
    removeCookies("refreshToken");
  };
  return (
    <S.Wrapper pageTheme={pageTheme}>
      <S.NameWrapper>
        {user.name} {user.surname}
      </S.NameWrapper>
      <S.ImageWrapper>
        <S.Image src={file} alt="avatar" />
        <input id="profilePic" onChange={handleFile} hidden type="file" />
        <S.EditPictureWrapper htmlFor="profilePic">
          Edit profile picture
        </S.EditPictureWrapper>
        {avatar && <S.Button onClick={handleAvatarChange}>Submit</S.Button>}
      </S.ImageWrapper>
      <S.Text onClick={handleEditUser}>Edit name</S.Text>
      <S.InputWrapper editUser={editUser}>
        <S.Input
          placeholder="Enter new name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <S.Input
          placeholder="Enter new surname"
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
        />
        <S.Button onClick={handleNameChange}>Submit</S.Button>
      </S.InputWrapper>
      <S.LogoutButton onClick={() => Logout()}>Logout</S.LogoutButton>
    </S.Wrapper>
  );
};

export default UserPanelSection;
