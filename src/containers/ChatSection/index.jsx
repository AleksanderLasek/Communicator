import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import EmojiPicker from "emoji-picker-react";
import { convertBase64 } from "../../components/converterBase";
import { scaleImage } from "../../components/scaleImage";


const ChatSection = ({ user, swap, changeLoaded }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendss, setFriendss] = useState([]);
  const [newChatUsers, setNewChatUsers] = useState([]);
  const [choosenChat, setChoosenChat] = useState("");
  const [chats, setChats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showFileList, setShowFileList] = useState(false);
  const [chooseFileType, setChooseFileType] = useState(false);
  const [chooseChatEdit, setChooseChatEdit] = useState(false);
  const [files, setFiles] = useState("");
  const [droppedFile, setDroppedFile] = useState();
  const [newChatAvatar, setNewChatAvatar] = useState();
  const [receiver, setReceiver] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
    avatar2: "",
    avatarGroup: "",
    
  });
  const [chat, setChat] = useState([]);
  const [idOfLastMessage, setIdOfLastMessage] = useState();
  const [showPhoto, setShowPhoto] = useState(false);
  const [shownPhoto, setShownPhoto] = useState({
    fileId: "",
    base64: "",
    fileName: "",
  });
  const [shownPhotoId, setShownPhotoId] = useState();
  const [showChatMaker, setShowChatMaker] = useState(false);
  const [showChatNameChanger, setShowChatNameChanger] = useState(false);
  const [chatName, setChatName] = useState('');
  const [fileName, setFileName] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getdata = async (file_id, fileName) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/files/get`,
        { file_id: file_id },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };
  const getImage = async (file_id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/files/get`,
        { file_id: file_id },
        { responseType: "blob" }
      );

      const base64 = await convertBase64(res.data);
      setShownPhoto({ ...shownPhoto, base64: base64 });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragV2 = async (e) => {
    e.preventDefault();
    setDroppedFile(e.dataTransfer.files[0]);
    setFiles(e.dataTransfer.files[0].name);
  };
  const GetChats = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/get`, {
        email: user.email,
      });
      setChats(res.data.chats);
    } catch (err) {
      console.log(err);
    }
  };
  const SendMessage = async () => {
    const file = new FormData();
    file.append("file", droppedFile);
    setMessage("");
    setFiles("");
    let file_id = "";
    let miniature = "";

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/files/upload`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      file_id = res.data;
    } catch (err) {
      console.log(err);
    }

    const fileExtension = files.split(".").pop();
    if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      const convertedMiniature = await convertBase64(droppedFile);
      miniature = await scaleImage(convertedMiniature, 200);
    }

    const path = window.location.pathname.substring("/chat/".length);

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/send`, {
        message: message,
        path: path,
        sender: user.email,
        receiver: receiver.email,
        fileId: file_id,
        fileName: files,
        miniature: miniature,
      });
    } catch (err) {
      console.log(err);
    }
    GetChats();
    GetChat();
  };
  const GetChat = async () => {
    if (!loaded) {
      setTimeout(() => {
        changeLoaded(true);
      }, 1000);
    }
    const path = window.location.pathname.substring("/chat/".length);
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat`, {
        path: path,
      });
      setChat(res.data.Chat);
    } catch (err) {
      console.log(err);
    }
  };
  const GetFriendss = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/friends`, {
        email: user.email,
      });
      const List = res.data.Friends;
      const emailList = List.map((obj) => obj.friendEmail);
      try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/users`, {
          refreshToken: cookie.refreshToken,
          filter: emailList,
        });
        setFriendss(res.data.UsersList);
  
    } catch (err) {
      console.log(err);
    }
    }catch(err){
      console.log(err)
    }
  }
  const GetFriends = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/users`, {
         refreshToken: cookie.refreshToken,
      });
      setFriends(res.data.UsersList);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/get`, {
        email: user.email,
      });
      if (window.location.pathname.substring("/chat/") === "/chat") {
        window.history.pushState({}, null, `/chat/${res.data.chats[0].chat}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const GetDateOfLastMessage = async () => {
    try {
      const path = window.location.pathname.substring("/chat/".length);
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/date`, {
        path: path,
      });

      if (res.data.MessageDate._id !== idOfLastMessage) {
        setIdOfLastMessage(res.data.MessageDate._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    
  }, [user.email, friends, idOfLastMessage, receiver]);
  useEffect(() => {
    GetFriends();
    GetFriendss();
  }, [user.email, ]);
  useEffect(() => {
    GetChats();
  }, [friends]);
  const ChooseChat = (friend, strink, chatName, friend2, avatar) => {
    if (chatName !== choosenChat || strink !== receiver.name || avatar !== receiver.avatarGroup) {
      setChoosenChat(chatName);
      window.history.pushState({}, null, `/chat/${chatName}`)
      setReceiver({
        name: strink,
        surname: friend.surname,
        avatar: friend.avatar,
        avatar2: friend2 ? friend2.avatar : "",
        email: friend.email,
        avatarGroup: avatar
      });
    }
  };
  const sendKey = (e) => {
    if (e.key === "Enter") {
      SendMessage();
    }
  };
  const [isEmojiPanel, setIsEmojiPanel] = useState(false);
  const toggleEmojiPanel = () => {
    setIsEmojiPanel((current) => !current);
  };
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.emoji);
  };
  const handleShowFoto = async (fileId, fileName) => {
    setShowPhoto(true);
    setFileName(fileName);
    setShownPhotoId(fileId);
    setShownPhoto({ ...shownPhoto, fileId: fileId, fileName: fileName });
    getImage(fileId);
  };
  const handleHidePhoto = () => {
    setShowPhoto(false);
    setShownPhoto({ base64: "" });
  };
  const downloadPhoto = () => {
    getdata(shownPhotoId, fileName);
  };
  const handleShowChatMaker = () => {
    setShowChatMaker((current) => !current);
  };
  const handleShowChatNameChanger = () => {
    setShowChatNameChanger(current => !current);
  }
  const addUserToChatList = (friend) => {
    if (!newChatUsers.includes(friend)) {
      setNewChatUsers([...newChatUsers, friend]);
    }
    console.log(newChatUsers);
  };
  const deleteUserFromChatList = (usr) => {
    setNewChatUsers(newChatUsers.filter((element) => element !== usr));
  };
  const createNewChat = async () => {
    const newChatEmails = newChatUsers.map((obj) => obj.email);
    newChatEmails.sort();
    let string = user.email;
    for (let i = 0; i < newChatEmails.length; i++) {
      string += ".";
      string += newChatEmails[i];
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/create`, {
        collectionName: string,
      });
    } catch (err) {
      console.log(err);
    }
    handleShowChatMaker();
    GetChats();
  };
  const handleChatName = (e) => {
    setChatName(e.target.value);
  }
  const handleChatRename = async() => {
    try {
      const path = window.location.pathname.substring("/chat/".length);
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/rename`, {collectionName: path, chatName: chatName});
      
      setShowChatNameChanger(false);
      GetChats();
      GetChat()
    }catch(err){
      console.log(err);
    }
  }
  const handleShowFileList = () => {
    setShowFileList(current => !current);
  }
  const handleChatAvatar = async(e) => {
    const avatar = await convertBase64(e.target.files[0])
    setNewChatAvatar(avatar);
  }
  const handleChatAvatarChange = async() => {
    try{
      const path = window.location.pathname.substring("/chat/".length);
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/avatar`, {collectionName: path, avatar: newChatAvatar});
      setShowChatNameChanger(false);
      setReceiver({avatarGroup: newChatAvatar});
      GetChat();
      GetChats();
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
      {showFileList && (
        <>
        <S.shownPhotoBackground>
        <S.changePhoto
            className="big times circle outline icon"
            onClick={handleShowFileList}
          />
        <S.FilesAndImagesWrapper>
          <S.FilesAndImagesMenu>
            <S.FilesAndImagesMenuItem  onClick={() => setChooseFileType(false)} choose={chooseFileType}>Files</S.FilesAndImagesMenuItem>
            <S.FilesAndImagesMenuItem  onClick={() => setChooseFileType(true)} choose={!chooseFileType}>Images</S.FilesAndImagesMenuItem>
          </S.FilesAndImagesMenu>
          <S.FilesAndImagesList>
          {chat.map((message, index) => {
            return (
              <S.FilesAndImagesListItem key={index}>
              {message.fileName && (
                <>
                  {chooseFileType && message.miniature && (
                    <>
                      <S.ImageMessage
                        src={message.miniature}
                        onClick={() =>
                          handleShowFoto(
                            message.fileId,
                            message.fileName
                          )
                        }
                      />
                    </>
                  )}
                  {!chooseFileType && !message.miniature && (
                    <>
                      <S.FileMessage
                        onClick={() =>
                          getdata(message.fileId, message.fileName)
                        }
                        pageTheme={swap}
                      >
                        <i className="file outline icon" />
                        {message.fileName}
                      </S.FileMessage>
                    </>
                  )}
                </>
              )}
              </S.FilesAndImagesListItem>
            )
           
          })}
         </S.FilesAndImagesList>
         </S.FilesAndImagesWrapper>
        </S.shownPhotoBackground>
        </>
      )}
      {showChatNameChanger && (
        <S.shownPhotoBackground>
          <S.changePhoto
            className="big times circle outline icon"
            onClick={handleShowChatNameChanger}
          />
          <S.FilesAndImagesWrapper>
          <S.FilesAndImagesMenu>
            <S.FilesAndImagesMenuItem  onClick={() => setChooseChatEdit(false)} choose={chooseChatEdit}>Name</S.FilesAndImagesMenuItem>
            <S.FilesAndImagesMenuItem  onClick={() => setChooseChatEdit(true)} choose={!chooseChatEdit}>Avatar</S.FilesAndImagesMenuItem>
          </S.FilesAndImagesMenu>
         
          {!chooseChatEdit ? (
            <S.ChangeNameWrapper>
            <div>Type new chat name</div>
            <S.ChangeNameInput onChange={handleChatName} />
            <S.CreateChatButton onClick={handleChatRename} > 
              Change name
            </S.CreateChatButton>
          </S.ChangeNameWrapper>
          ): (
<S.ChangeNameWrapper>
            
            <input id="chatAv" type="file" hidden onChange={handleChatAvatar}/>
            <label htmlFor="chatAv">Choose a new chat avatar</label>
            {newChatAvatar && (
              <img src={newChatAvatar} style={{width: "50px", height: "50px", borderRadius: "50%"}}/>
            )}
            <S.CreateChatButton onClick={handleChatAvatarChange} > 
              Change name
            </S.CreateChatButton>
          </S.ChangeNameWrapper>
          )}
          </S.FilesAndImagesWrapper>
        </S.shownPhotoBackground>
      )}
      {showPhoto && (
        <S.shownPhotoBackground>
          <S.DownloadIcon
            className="big save outline icon"
            onClick={downloadPhoto}
          />
          <S.changePhoto
            className="big times circle outline icon"
            onClick={handleHidePhoto}
          />
          <S.Photo src={shownPhoto.base64} />
        </S.shownPhotoBackground>
      )}
      {showChatMaker && (
        <S.ChatMakerWrapper>
          <S.changePhoto
            className="big times circle outline icon"
            onClick={handleShowChatMaker}
          />
          <S.ChatMaker pageTheme={swap}>
            <S.ChatUsers pageTheme={swap}>
              {newChatUsers.map((usr, index) => {
                return (
                  <S.ChatUser pageTheme={swap}>
                    {usr.name} {usr.surname}
                    <S.CancelUserIcon
                      className="x icon"
                      onClick={() => deleteUserFromChatList(usr)}
                    />
                  </S.ChatUser>
                );
              })}
            </S.ChatUsers>
            <S.ChatMakerList pageTheme={swap}>
              {friendss.map((friend, index) => {
                return (
                  <S.ChatMakerListUser pageTheme={swap} key={index}>
                    {friend.name} {friend.surname}
                    <S.PlusIcon
                      className="plus icon"
                      onClick={() => addUserToChatList(friend)}
                    />
                  </S.ChatMakerListUser>
                );
              })}
            </S.ChatMakerList>
            <S.CreateChatButton onClick={createNewChat} pageTheme={swap}>
              Create chat
            </S.CreateChatButton>
          </S.ChatMaker>
        </S.ChatMakerWrapper>
      )}
      <S.Wrapper>
        <S.ListWrapper pageTheme={swap}>
          <S.ListBar pageTheme={swap}>
            <S.ListBarText>Chats</S.ListBarText>
            <div>
              <S.ListBarIcon
                className="large plus icon"
                onClick={handleShowChatMaker}
              />
            </div>
          </S.ListBar>

          {chats.map((chatName, index) => {
            const users = chatName.chat.split(".");
            const usersInChat = users.filter(
              (element) => element !== user.email
            );

            const friend = friends.filter(
              (element) => element.email === usersInChat[0]
            );
            const friend2 = friends.filter((el) => el.email === usersInChat[1]);
            let strink = "";
              
            if(chatName.name){
              strink = chatName.name;
             
            }else{
              for (let i = 0; i < usersInChat.length; i++) {
                const frnd = friends.filter((el) => el.email === usersInChat[i]);
                let str = i === usersInChat.length - 1 ? "" : ", ";
                strink += frnd[0].name + str;
              }
            }
            if (
              chatName.chat ===
              window.location.pathname.substring("/chat/".length)
            ) {
              ChooseChat(friend[0], strink, chatName.chat, friend2[0], chatName.avatar);
            }
            return (
              <S.FriendWrapper
                pageTheme={swap}
                key={index}
                onClick={() =>
                  ChooseChat(friend[0], strink, chatName.chat, friend2[0], chatName.avatar)
                }
                style={{
                  backgroundColor: chatName.chat === choosenChat && "#144f7d9d",
                }}
              >
                {!chatName.avatar ? (
                  <>
                  <S.ImageWrapper src={friend[0].avatar} alt="avatar" />
                  {usersInChat.length > 1 && (
                    <S.ImageWrapper src={friend2[0].avatar} secondImage={true} />
                  )}
                  </>
                ) :(
                  <>
                    <S.ImageWrapper src={chatName.avatar}/>
                  </>
                )}
                <S.FriendNameWrapper pageTheme={swap}>
                  {strink}
                  {usersInChat.length === 1 && <>&nbsp;{friend[0].surname}</>}
                </S.FriendNameWrapper>
                
              </S.FriendWrapper>
            );
          })}
        </S.ListWrapper>
        {chats.length !== 0 && (
        <S.ChatWindowWrapper
          pageTheme={swap}
          onDrop={handleDragV2}
          onDragOver={handleDragOver}
        >
          <S.ChatBarWrapper pageTheme={swap}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
             {receiver.avatarGroup ? (
              <>
              <S.ChatImageWrapper src={receiver.avatarGroup}/>
              </>
             ): (
              <>
              <S.ChatImageWrapper src={receiver.avatar} alt="avatar" />
              {choosenChat.split(".").length > 2 && (
                <S.ChatImageWrapper
                  src={receiver.avatar2}
                  style={{ marginLeft: "-30px" }}
                />
              )}
              </>
             )} 
            <S.ChatNameWrapper>
              {receiver.name} 
              {choosenChat.split(".").length === 2 && (
                <>&nbsp;{receiver.surname}</>
              )}
            </S.ChatNameWrapper>
            {choosenChat.split(".").length > 2 && (
              <div><i className="edit icon" onClick={() => setShowChatNameChanger(true)}/></div>
            )}</div>
            <div style={{padding: "0px 15px"}}><i className="file icon" onClick={handleShowFileList}/></div>
          </S.ChatBarWrapper>
          <S.MessageWindowWrapper pageTheme={swap}>
            {chat && chat.map((message, index) => {
              if (message.sender === user.name) {
                return (
                  <S.MessageSentLineWrapper key={index}>
                    <S.MessageSentWrapper pageTheme={swap}>
                      {message.message}

                      {message.fileName && (
                        <>
                          {message.miniature ? (
                            <>
                              <S.ImageMessage
                                src={message.miniature}
                                onClick={() =>
                                  handleShowFoto(
                                    message.fileId,
                                    message.fileName
                                  )
                                }
                              />
                            </>
                          ) : (
                            <>
                              <S.FileMessage
                                onClick={() =>
                                  getdata(message.fileId, message.fileName)
                                }
                                pageTheme={swap}
                              >
                                <i className="file outline icon" />
                                {message.fileName}
                              </S.FileMessage>
                            </>
                          )}
                        </>
                      )}
                    </S.MessageSentWrapper>
                  </S.MessageSentLineWrapper>
                );
              } else {
                const friend = friends.filter((el) => el.email === message.sender)
                return (
                  <>
                  
                   
                 
                    <S.MessageReceivedLineWrapper key={index}>
                    {message.addName === 'true' && friend[0] && (
                      <div style={{display: "flex", color: "white"}}>
                        <S.GroupUserAvatar src={friend[0].avatar} />
                        <S.GroupUserName>{friend[0].name} {friend[0].surname}</S.GroupUserName>
                      </div>
                    )}
                      <S.MessageReceivedWrapper pageTheme={swap}>
                        {message.message}
                        {message.fileName && (
                          <>
                            <S.FileMessage
                              onClick={() =>
                                getdata(message.fileId, message.fileName)
                              }
                              pageTheme={swap}
                            >
                              <i className="file outline icon" />
                              {message.fileName}
                            </S.FileMessage>
                          </>
                        )}
                      </S.MessageReceivedWrapper>
                    </S.MessageReceivedLineWrapper>
                  </>
                );
              }
            })}
          </S.MessageWindowWrapper>
          {files !== "" && (
            <S.FilesWrapper>
              <S.FileElement>
                <S.DeleteFileIcon className="small x icon" />
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
        )}
      </S.Wrapper>
    </>
  );
};

export default ChatSection;
