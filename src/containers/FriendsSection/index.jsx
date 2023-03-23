import React, { useEffect, useState } from "react";
import * as S from './index.styles';
import axios from "axios";

const FriendsSection = ({user}) => {
    const [users, setUsers] = useState([]);
    const [invitations, setInvitations] = useState([]);
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
            setInvitations(res.data.InvitationList);
            console.log(invitations)
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