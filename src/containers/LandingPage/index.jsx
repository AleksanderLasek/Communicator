import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import axios from "axios";
import { useCookies } from "react-cookie";

const LandingPage = ({changeLoaded, swap, user}) => {
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [cookie] = useCookies();
  useEffect(() => {
    
    GetFriends();
  }, [user.email])
  useEffect(() => {
   
    GetChats();
    
  }, [friends])
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
 
        });
        setFriends(res.data.UsersList);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const GetChats = async() => {
    try {
      const res = await axios.post('http://localhost:5000/chat/get', {email: user.email});
      setChats(res.data.chats);
      changeLoaded(true);
    }catch(err){ 
      console.log(err)
    }
  }
  const moveToChat = (chatName) => {
    window.location.assign(`/chat/${chatName}`);
  }
  return (
    <S.Wrapper>
      <S.Label pageTheme={swap}>Recent chats</S.Label>
      <S.Vita>
        {chats.map((chatName, index) => {
          const users = chatName.chat.split('.');
          const usersInChat = users.filter(element => element !== user.email);
       
          const friend = friends.filter(element => element.email === usersInChat[0]);
          const friend2 = friends.filter(el => el.email === usersInChat[1]);
          let strink = '';
      
          for(let i =0; i<usersInChat.length; i++){
            const huj = friends.filter(el => el.email === usersInChat[i]);
            let str = i === (usersInChat.length - 1) ? '' : ', ';
            strink+=huj[0].name + str;
          
          }
          console.log(friend)
          strink = usersInChat.length > 1 ? strink : `${friend[0].name} ${friend[0].surname}`
            return (
              <S.User key={index} onClick={() => moveToChat(chatName.chat)}>
                <S.Avatar src={friend[0].avatar} alt="avatar" />
                {usersInChat.length > 1 && (
                  <S.Avatar src={friend2[0].avatar} style={{marginLeft: "-2%", position: "absolute"}}/>
                )}
                <S.Name pageTheme={swap}>{strink}</S.Name>
              </S.User>
            )
        })}
     
      </S.Vita>
    </S.Wrapper>
  );
};
export default LandingPage;
