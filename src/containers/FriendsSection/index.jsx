import React, { useEffect, useState } from "react";
import * as S from './index.styles';
import axios from "axios";
import { useCookies } from "react-cookie";

const FriendsSection = ({user}) => {
    const [users, setUsers] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [cookie] = useCookies();
    const GetFriends = async () => {
        try {
            const res = await axios.post('http://localhost:5000/users', {refreshToken: user.name});
            setUsers(res.data.UsersList);
            console.log(users)
        }catch(err){
            console.log(err); 
        }
    } 
    const InviteFriend = async(usr) => {
        try {
            const res = await axios.post('http://localhost:5000/invitations/add', {email: user.email, invitedEmail: usr.email});

        }catch(err){
            console.log(err);
        }
    }
    const GetInvitations = async() => {
        try {
            const res = await axios.post('http://localhost:5000/invitations', {email: user.email});
            const List = res.data.from;
            try {
                const res = await axios.post('http://localhost:5000/users', {refreshToken: cookie.refreshToken, filter: List})
                setInvitations(res.data.UsersList);
                console.log(invitations)
            }catch(err){
              console.log(err)
            } 
        }catch(err){  
            console.log(err);
        }
    }
    useEffect(() => {
        GetFriends();   
        GetInvitations(); 
    }, [user.name])
    return (
        <S.Wrapper>
            <S.InvitesWrapper>
                {invitations.map((invitation, index) => {
                    return (
                        <S.Invite key={index}><S.Avatar src={invitation.avatar}/> {invitation.name} {invitation.surname}</S.Invite>
                    )
                })}
            </S.InvitesWrapper>
            <S.UsersWrapper>
                {users.map((usr, index) => {
                    return (
                        <S.User key={index}>
                           <S.Avatar src={usr.avatar}/>
                            <div>{usr.name} {usr.surname}</div>
                            <S.AddUserButton onClick={() => InviteFriend(usr)}>Add user</S.AddUserButton>
                        </S.User>
                    )
                })}
            </S.UsersWrapper>
        </S.Wrapper>
    )
}
export default FriendsSection;