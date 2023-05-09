import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import * as S from "./index.styles";
import { useCookies } from "react-cookie";
import LoginRegistrationSection from "../containers/LoginRegistrationSection";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Router from "../Router";
import ChatSection from "../containers/ChatSection";
import FriendsSection from "../containers/FriendsSection";
import NotificationsSection from "../containers/NotificationsSection";
import LoadingPage from "../containers/LoadingPage";
import LandingPage from "../containers/LandingPage";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [swap, setSwap] = useState(
    () => localStorage.getItem("mode") === "true"
  );
  const [cookie] = useCookies(["refreshToken"]);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
  });
  const pageTheme = (data) => {
    setSwap(data);
  };
  const refreshToken = async () => {
    const token = cookie.refreshToken;
    const res = await axios.post("http://localhost:5000/users/token", {
      refreshToken: token,
    });
    const decoded = jwtDecode(res.data.accessToken);
    setUser({
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
      avatar: decoded.avatar,
    });
  };
  useEffect(() => {
    if (cookie.refreshToken) {
      refreshToken();
    }
  }, []);
  const changeLoaded = (data) => {
    setLoaded(data);
  };
  return (
    <>
      {!loaded && <LoadingPage />}
      <Header pageTheme={pageTheme} swap={swap} user={user} />
      <S.Wrapper pageTheme={swap}>
        {cookie.refreshToken ? (
          <>
            <Router path="/">
              <LandingPage changeLoaded={changeLoaded} swap={swap} user={user}></LandingPage>
            </Router>
            <Router path="/chat">
              <ChatSection
                user={user}
                swap={swap}
                changeLoaded={changeLoaded}
              ></ChatSection>
            </Router>
            <Router path="/friends">
              <FriendsSection
                user={user}
                swap={swap}
                changeLoaded={changeLoaded}
              />
            </Router>
            <Router path="/nots">
              <NotificationsSection
                user={user}
                swap={swap}
                changeLoaded={changeLoaded}
              />
            </Router>
          </>
        ) : (
          <>
            <LoginRegistrationSection changeLoaded={changeLoaded} swap={swap} />
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default App;
