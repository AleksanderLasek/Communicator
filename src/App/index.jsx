import React, { useState } from "react";
import Header from "../components/Header";
import * as S from './index.styles';
import axios from 'axios';
import { useCookies } from "react-cookie";


const App = () => {
    const [swap, setSwap] = useState(true);
    const [logged, setLogged] = useState(false);
    const [choice, setChoice] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['refreshToken']);
    const [inputBorder, setInputBorders] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })
    const handleUser = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    const pageTheme = (data) => {
        setSwap(data);
    }
    const handleChoice = () => {
        setChoice(current => !current);
        setInputBorders('');
    }
    const handleSignIn = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/users/login", user);
            
            if(res.status === 200) {
                const expire = new Date();
                expire.setTime(expire.getTime() + 60 * 60 * 24 * 1000);
                console.log(expire)
                setCookie('refreshToken', res.data.refreshToken, {path: "/", expires: expire});
            }else if(res.status === 201) {
                setInputBorders('1px solid red');
            }else{
                setError(res.data.msg);
            }
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/users", user);
            if(res.status === 200) {
                setError('');
                handleSignIn(e);
            }else if(res.status === 201) {
                setInputBorders('1px solid red');
            }else{
                setError(res.data.msg);
            }
           
        }catch(err){
            console.log(err);
        }
    }
    const handleEnter = (event) => {
        if(event.key === 'Enter') {
            handleSignIn(event);
        }
    }
    const handleEnterOnSignUp = (event) => {
        if(event.key === 'Enter') {
            handleSignUp(event);
        }
    }
    return (
        <>
        <Header pageTheme={pageTheme}/>
        <S.Wrapper pageTheme={swap}>
            
            {cookie.refreshToken ? (
                <>
                    chuj
                </>
            ) : (
                <>
                {choice ? (
                <S.LoginWrapper pageTheme={swap}>
                    <S.WelcomeMessage>Welcome!</S.WelcomeMessage>
                    <S.InputsWrapper>
                        <S.Input placeholder="Email" name="email" onChange={handleUser} style={{border: inputBorder}} onKeyPress={handleEnter}/>
                        <S.Input placeholder="Password" type="password" name="password" onChange={handleUser} style={{border: inputBorder}} onKeyPress={handleEnter}/>
                        <S.Button onClick={handleSignIn}>Sign in</S.Button>
                        {error}
                    </S.InputsWrapper>
                    <S.WelcomeMessage>
                        Don't have an account?<br/>
                        <S.ChangeButton onClick={handleChoice}>Sign up</S.ChangeButton>
                    </S.WelcomeMessage>
                </S.LoginWrapper>
                
                ) : (
                    <>
                    <S.LoginWrapper pageTheme={swap}>
                    <S.WelcomeMessage>Welcome!</S.WelcomeMessage>
                    <S.InputsWrapper>
                        <S.Input placeholder="Name" name="name" onChange={handleUser} style={{border: inputBorder}} onKeyPress={handleEnterOnSignUp}/>
                        <S.Input placeholder="Surname" name="surname" onChange={handleUser} style={{border: inputBorder}} onKeyPress={handleEnterOnSignUp}/>
                        <S.Input placeholder="Email" name="email" onChange={handleUser} style={{border: inputBorder}} onKeyPress={handleEnterOnSignUp}/>
                        <S.Input placeholder="Password" type="password" name="password" onChange={handleUser} style={{border: inputBorder}} onKeyPress={handleEnterOnSignUp}/>
                        <S.Button onClick={handleSignUp}>Sign up</S.Button>
                        {error}
                    </S.InputsWrapper>
                    <S.WelcomeMessage>
                        Already have an account?<br/>
                        <S.ChangeButton onClick={handleChoice}>Sign in</S.ChangeButton>
                    </S.WelcomeMessage>
                </S.LoginWrapper>
                    </>
                )}
                </>
            )}
        </S.Wrapper>
        </>
    )
}

export default App;