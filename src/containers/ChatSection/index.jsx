import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import EmojiPicker from "emoji-picker-react";
import { convertBase64 } from '../../components/converterBase';
import { scaleImage } from "../../components/scaleImage";
import { Buffer } from 'buffer';

const ChatSection =  ({ user, swap, changeLoaded }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [files, setFiles] = useState('');
  const [image, setImage] = useState([{
    fileId: '',
    base64: ''
  }])
  const [gotImages, setGotImages] = useState(false);
  const [droppedFile, setDroppedFile] = useState();
  const [receiver, setReceiver] = useState({
    name: "",
    surname: "", 
    email: "",
    avatar: "",
  });
  const [chat, setChat] = useState([]);
  const [idOfLastMessage, setIdOfLastMessage] = useState();
  const [showPhoto, setShowPhoto] = useState(false);
  const [shownPhoto, setShownPhoto] = useState({
    fileId: '',
    base64: '',
    fileName: ''
  });
  const [chuj, setChuj] = useState('')
  const [cookie] = useCookies();
  const handleChange = (e) => {
    setMessage(e.target.value); 

  }; 
 
  const getdata = async(file_id, fileName) => { 
    console.log(file_id)
    try { 
      const res = await axios.post('http://localhost:5000/files/get', {file_id: file_id}, {responseType: 'blob'});
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}`);
      document.body.appendChild(link);
      link.click();
    }catch(err){  
      console.log(err);  
    } 
  }   
  const getImage = async(file_id) => { 
    try { 
      const res = await axios.post('http://localhost:5000/files/get', {file_id: file_id}, {responseType: 'blob'});
      
      const chuj = await convertBase64(res.data);
      setShownPhoto({...shownPhoto, base64: chuj})
    }catch(err){  
      console.log(err);  
    } 
  }   

  
  
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDragV2 = async(e) => {
    e.preventDefault();
    setDroppedFile(e.dataTransfer.files[0]);
    setFiles(e.dataTransfer.files[0].name)
  } 
  
  const SendMessage = async () => {
    const file = new FormData();
    file.append("file", droppedFile);
    setMessage("");
    setFiles('')
    let file_id;
    try {
      const res = await axios.post('http://localhost:5000/files/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      file_id = res.data;
    }catch(err){  
      console.log(err);
    }
    let miniature;
    const fileExtension = files.split('.').pop();
    if(fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg'){
      const convertedMiniature = await convertBase64(droppedFile);
      miniature = await scaleImage(convertedMiniature, 100, 100);
    }
    try {
      await axios.post("http://localhost:5000/chat/send", {
        message: message,
        sender: user.email,
        receiver: receiver.email,
        fileId: file_id,
        fileName: files,
        miniature: miniature,
      });
      GetChat();
    } catch (err) {
      console.log(err);
    }
    
  };
  const GetChat = async () => {
    changeLoaded(true);
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        sender: user.email,
        receiver: receiver.email,
      });

      setChat(res.data.Chat);
      
    } catch (err) {
      console.log(err);
    }
  };
  const AddFriend = async () => {
    try {
      await axios.post("http://localhost:5000/friends/add", {
        name: user.email,
        friendEmail: receiver.email,
      });
    } catch (err) {
      console.log(err);
    }
  };
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
        ChooseChat(res.data.UsersList[0]);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const GetDateOfLastMessage = async() => {
    try {
      const res = await axios.post('http://localhost:5000/chat/date', {sender: user.email, receiver: receiver.email});
      if(res.data.MessageDate !== idOfLastMessage){
        setIdOfLastMessage(res.data.MessageDate);
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      GetDateOfLastMessage();  
    }, 500); 
    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    GetChat();
  }, [user.email, friends, idOfLastMessage, receiver])
  useEffect(() => {
    GetFriends();
  }, [user.email]);
  const ChooseChat = (friend) => {
    setReceiver({
      name: friend.name,
      surname: friend.surname,
      avatar: friend.avatar,
      email: friend.email,
    });
  };
  const sendKey = (e) => {
    if (e.key === "Enter") {
      SendMessage();
    }
  };

  //emoji

  const [isEmojiPanel, setIsEmojiPanel] = useState(false);
  const toggleEmojiPanel = () => {
    setIsEmojiPanel((current) => !current);
  };

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.emoji);
  };
  const handleShowFoto = async(fileId, fileName) => {
    setShowPhoto(true);
    setChuj(fileName)
    setShownPhoto({...shownPhoto, fileId: fileId, fileName: fileName}); 
    getImage(fileId);
   
    console.log(shownPhoto)
  }
  const handleHidePhoto = () => {
    setShowPhoto(false);
  }
  const downloadPhoto = () => {
    const byteCharacters = Buffer.from(shownPhoto.base64, 'base64');
    
    
// Tworzenie obiektu Blob na podstawie tablicy bufora i typu MIME
const blob = new Blob([byteCharacters], {type: ''});

// Tworzenie URL z obiektu Blob
const url = URL.createObjectURL(blob);

// Tworzenie elementu <a> i ustawienie jego atrybutów
const link = document.createElement('a');
link.href = url;
link.download = chuj;

// Kliknięcie elementu <a> aby rozpocząć pobieranie pliku
link.click();
  }
  return (
    <>
    {showPhoto && (
         <S.shownPhotoBackground>
            <S.DownloadIcon className="big save outline icon" onClick={downloadPhoto}/>
            <S.changePhoto className="big times circle outline icon" onClick={handleHidePhoto}/>
            <S.Photo src={shownPhoto.base64}/>
          
         </S.shownPhotoBackground>
      )}
    <S.Wrapper>
      
      <S.ListWrapper pageTheme={swap}>
        {friends.map((friend, index) => {
          return (
            <S.FriendWrapper
              pageTheme={swap}
              key={index}
              onClick={() => ChooseChat(friend)} 
              style={{ backgroundColor: friend.email === receiver.email }}
            >
              <S.ImageWrapper src={friend.avatar} alt="avatar" />
              <S.FriendNameWrapper pageTheme={swap}>
                {friend.name} {friend.surname} 
              </S.FriendNameWrapper>
            </S.FriendWrapper>
          );
        })}
      </S.ListWrapper>
      <S.ChatWindowWrapper pageTheme={swap} onDrop={handleDragV2} onDragOver={handleDragOver}>
        <S.ChatBarWrapper pageTheme={swap}>
          <S.ChatImageWrapper src={receiver.avatar} alt="avatar" />
          <S.ChatNameWrapper>
            {receiver.name} {receiver.surname}
          </S.ChatNameWrapper>
        </S.ChatBarWrapper>
        <S.MessageWindowWrapper pageTheme={swap} >
          {chat.map((message, index) => {  
            if (message.sender === user.name) {
              return (
                <S.MessageSentLineWrapper key={index}>
                  <S.MessageSentWrapper pageTheme={swap}>
                    {message.message}
              
                    {message.fileName &&  
                      <>
                      {message.miniature ? (
                        <>
                          <img src={message.miniature} onClick={() => handleShowFoto(message.fileId, message.fileName)}/>
                        </>
                      ) : (
                        <>
                          <S.FileMessage onClick={() => getdata(message.fileId, message.fileName)} pageTheme={swap}><i className="file outline icon"/>{message.fileName}</S.FileMessage>
                        </>
                      )}
                      
                      </>
                    }
                  </S.MessageSentWrapper>
                </S.MessageSentLineWrapper>
              );
            } else {
              return (
                <S.MessageReceivedLineWrapper key={index}>
                  <S.MessageReceivedWrapper pageTheme={swap}>
                    {message.message}
                    {message.fileName && 
                      <>
                      <S.FileMessage onClick={() => getdata(message.fileId, message.fileName)} pageTheme={swap}><i className="file outline icon"/>{message.fileName}</S.FileMessage>
                      </>
                    }
                   
                  </S.MessageReceivedWrapper>
                </S.MessageReceivedLineWrapper>
              );
            }
          })}
        </S.MessageWindowWrapper>
        {files !== '' && (
          <S.FilesWrapper>
            <S.FileElement>
              <S.DeleteFileIcon className="small x icon"/>
              {files}
            </S.FileElement>
          </S.FilesWrapper>
        )}
        <S.MessageTextBox pageTheme={swap}>
          {isEmojiPanel && window.innerWidth > 767 && (
            <S.EmojiContainer>
              <EmojiPicker
                theme={swap ? "light" : "dark"}
                onEmojiClick={handleEmojiSelect}
                searchDisabled
                emojiStyle="google"
              />
            </S.EmojiContainer>
          )}
          {isEmojiPanel && window.innerWidth <= 767 && (
            <S.EmojiContainer>
              <EmojiPicker
                emojiStyle="apple"
                height={450}
                width={350}
                theme={swap ? "light" : "dark"}
                onEmojiClick={handleEmojiSelect}
                searchDisabled
              />
            </S.EmojiContainer>
          )}
          
          <S.EmojiIcon
            pageTheme={swap}
            className="large smile outline icon"
            onClick={toggleEmojiPanel}
          />
          <S.MessageInput
            pageTheme={swap}
            
            value={chosenEmoji ? chosenEmoji.emoji : message}
            onChange={handleChange}
            onKeyPress={sendKey}
          
            
          />

          <S.MessageSentIcon
            pageTheme={swap}
            className="white large paper plane icon"
            onClick={SendMessage}
          />
        </S.MessageTextBox>
      </S.ChatWindowWrapper>
    </S.Wrapper>
    </>
  );
};

export default ChatSection;
