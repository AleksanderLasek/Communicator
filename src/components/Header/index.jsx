import React, { useEffect, useState } from "react";
import * as S from './index.styles';
import logo from '../../images/logo.png';


const Header = ({pageTheme}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [mode, setMode] = useState(false);
    
    const handleMode = () => {
        setMode(current => !current);
        pageTheme(mode);
    }
    useEffect(() => {
        const setCurrentWidth = () => {
            setWidth(window.innerWidth);
        }
        
        window.addEventListener('resize', setCurrentWidth);
        return () => {
        window.removeEventListener('resize', setCurrentWidth)
        }
    })
    return (
        <>
            <S.Wrapper>
                {width > 768 && ( 
                <S.LogoWrapper>
                    <img src={logo} style={{height: "3vw"}}/>
                </S.LogoWrapper>
                )}
                <S.CenterWrapper>
                    {width > 768 ? (
                    <>
                        <div><i className="comment alternate icon"/>CHAT</div>
                        <div><i className='address book icon'/>FRIENDS</div>
                        <div><i className="bell icon"/>NOTIFICATIONS</div>
                        
                    </>
                    ) : (
                    <>
                        <i className="comment alternate icon"/>
                        <i className='address book icon'/>
                        <i className="bell icon"/>
                    </>
                    )}
                </S.CenterWrapper>
                {width > 1024 ? (
                   <S.RightWrapper>
                    <S.Button>Sign up</S.Button><S.SignInText>Already have an account? <b>Sign in</b></S.SignInText>
                </S.RightWrapper> 
                ) : (
                    <div>
                        <i className="user circle icon"/>
                    </div>
                )}
                <S.CheckBoxWrapper >
                    <S.CheckBox id="checkbox" type="checkbox" onClick={handleMode}/>
                    <S.CheckBoxLabel htmlFor="checkbox" />
                </S.CheckBoxWrapper>
            </S.Wrapper>
        </>
    )
}

export default Header;