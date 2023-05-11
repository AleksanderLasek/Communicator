import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import axios from "axios";
import { useCookies } from "react-cookie";

const LandingPage = ({changeLoaded, swap, user}) => {
  const [friends, setFriends] = useState([]);
  const [cookie] = useCookies();
  useEffect(() => {
    changeLoaded(true);
    GetFriends();
  }, [user.email])
  const GetFriends = async () => {
    try {
      const res = await axios.post("http://localhost:5000/friends", {
        email: user.email,
      });
      const List = res.data.Friends;
      const emailList = List.map((obj) => obj.friendEmail);
      try {
        const res = await axios.post("http://localhost:5000/users", {
          refreshToken: cookie.refreshToken,
          filter: emailList,
        });
        setFriends(res.data.UsersList);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const moveToChat = (friend) => {
    const ChatName = [user.email, friend.email];
    ChatName.sort();
    window.location.assign(`/chat/${ChatName[0]}.${ChatName[1]}`);
  }
  return (
    <S.Wrapper>
      <S.Label pageTheme={swap}>Recent chats</S.Label>
      <S.Vita>
        {friends.map((friend, index) => {
            return (
              <S.User key={index} onClick={() => moveToChat(friend)}>
                <S.Avatar src={friend.avatar} alt="avatar" />
                <S.Name pageTheme={swap}>{friend.name} {friend.surname}</S.Name>
              </S.User>
            )
        })}
     
      </S.Vita>
    </S.Wrapper>
  );
};
export default LandingPage;
