import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import axios from "axios";
import { useCookies } from "react-cookie";

const NotificationsSection = ({ user, swap, changeLoaded }) => {
  const [nots, setNots] = useState([]);
  const [cookie] = useCookies();
  const ShowNotifications = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/nots/show`, {
        email: user.email, check: 1,
      });
      setNots(res.data.Nots);
      changeLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserParams = async (email) => {
    try {
      const list = [email];
      const res = await axios.post(`${process.env.REACT_APP_URL}/users`, {
        refreshToken: cookie.refreshToken,
        filter: list,
      });
      console.log(res);
      return res.data.UsersList[0];
    } catch (err) {
      console.log(err);
    }
  };
  const getMessage = (type, name) => {
    if (type === 1) {
      return `${name} invited you to friends!`;
    } else if (type === 2) {
      return `You and ${name} are now friends!`;
    } else if (type === 3) {
      return `${name} just sent you a message!`;
    }
  };
  const formatDate = (oldDate) => {
    const date = new Date(oldDate);
    date.setTime(date.getTime() - 86400000);
    const formattedTime = date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    if (
      date.getDate() === todayDate &&
      date.getMonth() === todayMonth &&
      date.getFullYear() === todayYear
    ) {
      return formattedTime;
    }
    const formattedDate = date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedDateTime = `${formattedTime} ${formattedDate}`;
    return formattedDateTime;
  };
  useEffect(() => {
    ShowNotifications();
  }, [user.email]);
  return (
    <S.Wrapper>
      {nots.map((not, index) => {
        return (
          <S.Notification pageTheme={swap}>
            <S.Avatar src={not.senderAvatar} />
            <S.Text>{getMessage(not.type, not.senderName)}</S.Text>
            <S.DateText>{formatDate(not.expireAt)}</S.DateText>
          </S.Notification>
        );
      })}
    </S.Wrapper>
  );
};

export default NotificationsSection;
