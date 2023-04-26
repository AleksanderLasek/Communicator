import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import logo from "../../images/logo.png";
import UserPanelSection from "../../containers/UserPanelSection";
import axios from "axios";

const Header = ({ pageTheme, user }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [mode, setMode] = useState(false);
  const [isUserPanel, setIsUserPanel] = useState(false);
  const [notsNumber, setNotsNumber] = useState(0);
  const toggleUserPanel = () => {
    setIsUserPanel((current) => !current);
  };
  const getNotsNumber = async() => {
    const res = await axios.post('http://localhost:5000/nots/show', {email: user .email});
    setNotsNumber(res.data.Nots.length);
  }
  const handleMode = () => {
    setMode((current) => !current);
    pageTheme(mode);
    
  };
  useEffect(() => {
    getNotsNumber();
  }, [user.email])
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
      {!user.name && width < 767 && (
        <S.MobileLogo href="/">
          <img src={logo} style={{ height: "10vw" }} alt="logo" />
        </S.MobileLogo>
      )}
      {isUserPanel && <UserPanelSection user={user} />}
      <S.Wrapper>
    
        {width > 767 ? (
          <S.LogoWrapper href="/">
            <img src={logo} style={{ height: "3vw" }} alt="logo" />
          </S.LogoWrapper>
        ) : (
          <> 
          {user.name && (
            <div><i className="user circle icon" onClick={toggleUserPanel} /></div>
          )}
          </>
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
                <div style={{zIndex: "2"}}>NOTIFICATIONS </div>
                {notsNumber > 0 && (
                  <S.NotsNumberNot>
                    {notsNumber}
                  </S.NotsNumberNot>
                )}
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

        
 
        {width > 768 && (
          <>
            {user.name && (
            <div><i className="user circle icon" onClick={toggleUserPanel} /></div>
            )}
          </>
        )}
       
          
        <div><S.Icon mode={mode} className={mode ? "sun icon" : "moon icon"} onClick={handleMode}/></div>
   
      </S.Wrapper>
    </>
  );
};

export default Header;
