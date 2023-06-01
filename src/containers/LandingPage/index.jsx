import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import axios from "axios";
import { useCookies } from "react-cookie";

const LandingPage = ({changeLoaded, swap, user}) => {
  const [friends, setFriends] = useState([]);
  const [friendNumber, setFriendNumber] = useState();
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
      const res = await axios.post(`${process.env.REACT_APP_URL}/friends`, {
        email: user.email,
      }); 
      const List = res.data.Friends;
      setFriendNumber(List.length);
      const emailList = List.map((obj) => obj.friendEmail);
      try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/users`, {
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
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/get`, {email: user.email});
      setChats(res.data.chats);
      changeLoaded(true);
    }catch(err){ 
      console.log(err)
    }
  }
  const moveToChat = (chatName) => {
    if(chatName){
      window.location.assign(`/chat/${chatName}`);
    }else{
      window.location.assign(`/chat`);
    }
  }
  const moveToFriends = () => {
    window.location.assign(`/friends`);
  }
  return (
    <S.Wrapper>

      {chats.length === 0 ? (
        <>
        {friendNumber === 0 ? (
          <S.Message onClick={moveToFriends}>
            Add new friends and start chatting!
          </S.Message>
        ) : (
          <S.Message pageTheme={swap} onClick={moveToChat}>
          Start chatting with your friends!
        </S.Message>
        )}
        </>
      ) : (
      <>
      <S.Label pageTheme={swap}>Recent chats</S.Label>
      <S.Vita>
        
        {chats.slice(0, 5).map((chatName, index) => {
          const users = chatName.chat.split('.');
          const usersInChat = users.filter(element => element !== user.email);
       
          const friend = friends.filter(element => element.email === usersInChat[0]);
          const friend2 = friends.filter(el => el.email === usersInChat[1]);
          let strink = '';
      
          if(chatName.name){
            strink = chatName.name;
          }else{
            for(let i =0; i<usersInChat.length; i++){
              const frnd = friends.filter(el => el.email === usersInChat[i]);
              let str = i === (usersInChat.length - 1) ? '' : ', ';
              strink+=frnd[0].name + str;
            
            }
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
      </>
      )}
    </S.Wrapper>
  );
};
export default LandingPage;
