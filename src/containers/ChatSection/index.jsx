import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import EmojiPicker from "emoji-picker-react";
import { convertBase64 } from "../../components/converterBase";
import { scaleImage } from "../../components/scaleImage";
import { Buffer } from "buffer";
import jezus from "../../images/jezus.jpg";

const ChatSection = ({ user, swap, changeLoaded }) => {
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendss, setFriendss] = useState([]);
  const [newChatUsers, setNewChatUsers] = useState([]);
  const [choosenChat, setChoosenChat] = useState("");
  const [chats, setChats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  
  const [chunks, setChunks] = useState([]);
  const [files, setFiles] = useState("");
  const [image, setImage] = useState([
    {
      fileId: "",
      base64: "",
    },
  ]);
  const [gotImages, setGotImages] = useState(false);
  const [droppedFile, setDroppedFile] = useState();
  const [receiver, setReceiver] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
    avatar2: "",
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
  const [cookie] = useCookies(["refreshToken"]);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getdata = async (file_id, fileName) => {
    console.log(file_id);
    try {
      const res = await axios.post(
        "http://localhost:5000/files/get",
        { file_id: file_id },
        { responseType: "blob" }
      );
      console.log(res);
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
        "http://localhost:5000/files/get",
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
      const res = await axios.post("http://localhost:5000/chat/get", {
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
      const res = await axios.post("http://localhost:5000/files/upload", file, {
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
      const res = await axios.post("http://localhost:5000/chat/send", {
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
      const res = await axios.post("http://localhost:5000/chat", {
        path: path,
      });
      setChat(res.data.Chat);
    } catch (err) {
      console.log(err);
    }
  };
  const GetFriendss = async () => {
    let choosenFriend;
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
        setFriendss(res.data.UsersList);
  
    } catch (err) {
      console.log(err);
    }
    }catch(err){
      console.log(err)
    }
  }
  const GetFriends = async () => {
    let choosenFriend;
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
        const path = window.location.pathname.substring("/chat/".length);
        choosenFriend = res.data.UsersList[0];
        if (path !== "") {
          const pathTab = path.split(".");
          let friendEmail = [pathTab[0]];
          if (pathTab[0] === user.email) {
            friendEmail[0] = pathTab[1];
          }
          const res1 = await axios.post("http://localhost:5000/users", {
            refreshToken: cookie.refreshToken,
            email: user.email,
            filter: friendEmail,
          });
          choosenFriend = res1.data.UsersList[0];
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.post("http://localhost:5000/chat/get", {
        email: user.email,
      });
      console.log(friends);
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
      const res = await axios.post("http://localhost:5000/chat/date", {
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
  }, [user.email]);
  useEffect(() => {
    GetChats();
  }, [friends]);
  const ChooseChat = (friend, strink, chatName, friend2) => {
    if (chatName !== choosenChat || strink !== receiver.name) {
      setChoosenChat(chatName);

      window.history.pushState({}, null, `/chat/${chatName}`);
      console.log(strink);
      setReceiver({
        name: strink,
        surname: friend.surname,
        avatar: friend.avatar,
        avatar2: friend2 ? friend2.avatar : "",
        email: friend.email,
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

    console.log(shownPhoto);
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
    console.log(string);
    try {
      const res = await axios.post("http://localhost:5000/chat/create", {
        collectionName: string,
      });
    } catch (err) {
      console.log(err);
    }
    handleShowChatMaker();
    GetChats();
  };
  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.addEventListener("dataavailable", (event) => {
          setChunks((prevChunks) => [...prevChunks, event.data]);
        });

        recorder.addEventListener("stop", () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioData(audioUrl);
          console.log(audioUrl);
          setChunks([]);
        });

        recorder.start();
      })
      .catch((error) => {
        console.error("Błąd przechwytywania dźwięku:", error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };
  const handleChatName = (e) => {
    setChatName(e.target.value);
  }
  const handleChatRename = async() => {
    try {
      const path = window.location.pathname.substring("/chat/".length);
      const res = await axios.post('http://localhost:5000/chat/rename', {collectionName: path, chatName: chatName});
      
      setShowChatNameChanger(false);
      GetChats();
      GetChat()
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      {showChatNameChanger && (
        <S.shownPhotoBackground>
          <S.changePhoto
            className="big times circle outline icon"
            onClick={handleShowChatNameChanger}
          />
          <S.ChangeNameWrapper>
            <div>Zmień nazwe</div>
            <S.ChangeNameInput onChange={handleChatName} />
            <S.CreateChatButton onClick={handleChatRename} > 
              Change name
            </S.CreateChatButton>
          </S.ChangeNameWrapper>
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
                  <S.ChatMakerListUser pageTheme={swap}>
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
              console.log('ccc')
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
              ChooseChat(friend[0], strink, chatName.chat, friend2[0]);
            }
            return (
              <S.FriendWrapper
                pageTheme={swap}
                key={index}
                onClick={() =>
                  ChooseChat(friend[0], strink, chatName.chat, friend2[0])
                }
                style={{
                  backgroundColor: chatName.chat === choosenChat && "#144f7d9d",
                }}
              >
                <S.ImageWrapper src={friend[0].avatar} alt="avatar" />
                {usersInChat.length > 1 && (
                  <S.ImageWrapper src={friend2[0].avatar} secondImage={true} />
                )}
                <S.FriendNameWrapper pageTheme={swap}>
                  {strink}
                  {usersInChat.length === 1 && <>&nbsp;{friend[0].surname}</>}
                </S.FriendNameWrapper>
              </S.FriendWrapper>
            );
          })}
        </S.ListWrapper>
        <S.ChatWindowWrapper
          pageTheme={swap}
          onDrop={handleDragV2}
          onDragOver={handleDragOver}
        >
          <S.ChatBarWrapper pageTheme={swap}>
            <S.ChatImageWrapper src={receiver.avatar} alt="avatar" />
            {choosenChat.split(".").length > 2 && (
              <S.ChatImageWrapper
                src={receiver.avatar2}
                style={{ marginLeft: "-30px" }}
              />
            )}
            <S.ChatNameWrapper>
              {receiver.name} 
              {choosenChat.split(".").length === 2 && (
                <>&nbsp;{receiver.surname}</>
              )}
            </S.ChatNameWrapper>
            {choosenChat.split(".").length > 2 && (
              <div><i className="edit icon" onClick={() => setShowChatNameChanger(true)}/></div>
            )}
          </S.ChatBarWrapper>
          <S.MessageWindowWrapper pageTheme={swap}>
            {chat.map((message, index) => {
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
                return (
                  <S.MessageReceivedLineWrapper key={index}>
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
      </S.Wrapper>
    </>
  );
};

export default ChatSection;
