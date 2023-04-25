import React, { useEffect, useState } from "react";
import * as S from './index.styles';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const NotificationsSection = ({user}) => {
    const [nots, setNots] = useState([]);
    const [cookie] = useCookies();
    const ShowNotifications = async() => {
        try {
            const res = await axios.post('http://localhost:5000/nots/show', {email: user.email});
            setNots(res.data.Nots);
        }catch(err){ 
            console.log(err);
        }
    }
    const getUserParams = async(email) => {
        try {
            const list = [email];
            const res = await axios.post('http://localhost:5000/users', {refreshToken: cookie.refreshToken, filter: list})
            console.log(res) 
            return res.data.UsersList[0];
        }catch(err){
            console.log(err);
        }
        
    }
    const getMessage = (type, name) => {
        if(type === 1){
            return `${name} invited you to friends!`;
        }else if(type === 2){
            return `You and ${name} are now friends!`;
        }else if(type === 3){
            return `${name} just sent you a message!`;
        }
    }
    useEffect(() => {    
        ShowNotifications();
    }, [user.email]) 
    return (
        <S.Wrapper>
            {nots.map((not, index) => { 
                return (
                    <S.Notification>
                        <S.Avatar src={not.senderAvatar}/>
                        <S.Text>{getMessage(not.type, not.senderName)}</S.Text>
                    </S.Notification>
                )
            })}
        </S.Wrapper>
    )
}

export default NotificationsSection;