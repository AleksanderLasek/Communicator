import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import logo from "../../images/logo.png";
import UserPanelSection from "../../containers/UserPanelSection";

const Header = ({ pageTheme, user }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [mode, setMode] = useState(false);
  const [isUserPanel, setIsUserPanel] = useState(false);

  const toggleUserPanel = () => {
    setIsUserPanel((current) => !current);
  };

  const handleMode = () => {
    setMode((current) => !current);
    pageTheme(mode);
  };
  useEffect(() => {
    const setCurrentWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", setCurrentWidth);
    return () => {
      window.removeEventListener("resize", setCurrentWidth);
    };
  });
  return (
    <>
      {width < 767 && (
        <S.MobileLogo href="/">
          <img src={logo} style={{ height: "10vw" }} alt="logo" />
        </S.MobileLogo>
      )}

      {isUserPanel && <UserPanelSection user={user} />}
      <S.Wrapper>
        {width > 767 && (
          <S.LogoWrapper href="/">
            <img src={logo} style={{ height: "3vw" }} alt="logo" />
          </S.LogoWrapper>
        )}

        <S.CenterWrapper>
          {width > 767 ? (
            <>
              <S.AWrapper href="/chat">
                <i className="comment alternate icon" />
                CHAT
              </S.AWrapper>
              <S.AWrapper href="/friends">
                <i className="address book icon" />
                FRIENDS
              </S.AWrapper>
              <S.AWrapper href="/nots">
                <i className="bell icon" />
                NOTIFICATIONS
              </S.AWrapper>
            </>
          ) : (
            <>
              <S.AWrapper href="/chat">
                <i className="comment alternate icon" />
              </S.AWrapper>
              <S.AWrapper href="/friends">
                <i className="address book icon" />
              </S.AWrapper>
              <S.AWrapper href="/nots">
                <i className="bell icon" />
              </S.AWrapper>
            </>
          )}
        </S.CenterWrapper>

        {user.name && (
          <i className="user circle icon" onClick={toggleUserPanel} />
        )}

        <S.CheckBoxWrapper>
          <S.CheckBox id="checkbox" type="checkbox" onClick={handleMode} />
          <S.CheckBoxLabel htmlFor="checkbox" />
        </S.CheckBoxWrapper>
      </S.Wrapper>
    </>
  );
};

export default Header;
