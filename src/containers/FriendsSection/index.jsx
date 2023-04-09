import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import axios from "axios";
import { useCookies } from "react-cookie";

const FriendsSection = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [isInvites, setIsInvites] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isFriends, setIsFriends] = useState(false);
  const [cookie] = useCookies();
  const GetUsers = async() => {
    try {
      const res = await axios.post('http://localhost:5000/users', {refreshToken: cookie.refreshToken, email: user.email});
      setUsers(res.data.UsersList);
    }catch(err){
      console.log(err);
    }
  }
  
  const GetFriends = async () => {
    try{
      const res = await axios.post('http://localhost:5000/friends', {email: user.email});
      const List = res.data.Friends;
      const emailList = List.map((obj) => obj.friendEmail);
      console.log(res);
      try {
        const res = await axios.post("http://localhost:5000/users", {
          refreshToken: user.name,
          filter: emailList,
        });
        console.log(res)
        setFriends(res.data.UsersList);
    
      } catch (err) {
        console.log(err);
      }
    }catch(err){
      console.log(err)
    }
  };
  const InviteFriend = async (usr) => {
    try {
      const res = await axios.post("http://localhost:5000/invitations/add", {
        email: user.email,
        invitedEmail: usr.email,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const DeleteFriend = async(usr) => {
    try {
      const res = await axios.post('http://localhost:5000/friends/delete', {email: user.email,  friendEmail: usr.email});
      
    }catch(err){
      console.log(err);
    }
  }
  const BlockUser = async(usr) => {
    try {
      const res = await axios.post('http://localhost:5000/users/block', {email: user.email, blockedEmail: usr.email});
    }catch(err){
      console.log(err);
    }
  }
  const GetInvitations = async () => {
    try {
      const res = await axios.post("http://localhost:5000/invitations", {
        email: user.email,
      });
      const List = res.data.InvitationList;
      const emailList = List.map((obj) => obj.from);

      try {
        const res = await axios.post("http://localhost:5000/users", {
          refreshToken: cookie.refreshToken,
          filter: emailList,
        });
        setInvitations(res.data.UsersList);
        console.log(invitations);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const DeclineInvite = async (inviterEmail) => {
    try {
      console.log(inviterEmail);
      const res = await axios.post(
        "http://localhost:5000/invitations/decline",
        { email: user.email, inviterEmail: inviterEmail }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const AcceptInvite = async (inviterEmail) => {
    try {
      const res = await axios.post("http://localhost:5000/invitations/accept", {
        email: user.email,
        inviterEmail: inviterEmail,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetUsers();
    GetFriends();
    GetInvitations();
  }, [user.name]);

  const toggleInvites = () => {
    setIsInvites((current) => !current);
  };

  const toggleUsers = () => {
    setIsUsers((current) => !current);
  };
  const toggleFriends = () => {
    setIsFriends((current => !current));
  }
  return (
    <S.Wrapper>
      <S.Label onClick={toggleInvites}>Invites</S.Label>
      {isInvites && (
        <S.InvitesWrapper>
          {invitations.map((invitation, index) => {
            return (
              <>
                <S.Invite key={index}>
                  <S.Avatar src={invitation.avatar} />
                  <S.Name>
                    {invitation.name} {invitation.surname}
                  </S.Name>
                  <S.DecideWrapper>
                    <S.Icon
                      className="large green check icon"
                      onClick={() => AcceptInvite(invitation.email)}
                    />
                    <S.Icon
                      className="large red x icon"
                      onClick={() => DeclineInvite(invitation.email)}
                    />
                  </S.DecideWrapper>
                </S.Invite>
              </>
            );
          })}
        </S.InvitesWrapper>
      )}
      <S.Label onClick={toggleFriends}>Friends</S.Label>
      {isFriends && (
        <S.FriendsWrapper>
          {friends.map((usr, index) => {
            return (
              <S.User key={index}>
                <S.Avatar src={usr.avatar} />
                <S.Name>
                  {usr.name} {usr.surname}
                </S.Name>
                <S.DecideWrapper>
                  <S.Icon className="trash alternate icon" onClick={() => DeleteFriend(usr)}/>
                  <S.Icon className="red ban icon" onClick={() => BlockUser(usr)}/>
                </S.DecideWrapper>
              </S.User>
            )
          })}
        </S.FriendsWrapper>
      )}
      <S.Label onClick={toggleUsers}>Users</S.Label>
      {isUsers && (
        <>
          <S.SearchBar>
            <S.SearchBarInput
              type="text"
              placeholder="Search"
              
            ></S.SearchBarInput>
          </S.SearchBar>
          <S.UsersWrapper>
            {users.map((usr, index) => {
              return (
                <>
                  <S.User key={index}>
                    <S.Avatar src={usr.avatar} />
                    <S.Name>
                      {usr.name} {usr.surname}
                    </S.Name>
                    <S.AddUserButton onClick={() => InviteFriend(usr)}>
                      Add user
                    </S.AddUserButton>
                  </S.User>
                </>
              );
            })}
          </S.UsersWrapper>
        </>
      )}
    </S.Wrapper>
  );
};
export default FriendsSection;
