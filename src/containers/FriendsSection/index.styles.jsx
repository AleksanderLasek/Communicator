import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: baseline;
  justify-self: baseline;
  align-items: center;
  margin-top: 70px;

  @media screen and (max-width: 1023px) {
    margin-top: 0;
    margin-bottom: 70px;
  }

  @media screen and (max-width: 767px) {
  }
`;

export const Label = styled.div`
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: white;
  letter-spacing: 1.5px;
  margin-top: 20px;
  margin-bottom: 10px;

  cursor: pointer;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;

  box-shadow: 0px 0px 5px 3px #0000004e;
  border-radius: 10px;

  transition: all 0.2s ease;
  transform: scale(1);

  &:active {
    transition: all 0.2s ease;
    transform: scale(1.1);
  }
`;

export const InvitesWrapper = styled.div`
  display: flex;
  max-height: 40vh;
  flex-wrap: wrap;
  max-width: 90vw;
  box-shadow: 7px 0px 14px 1px rgba(0, 0, 0, 0.14);
  background-color: #216377;
  border-radius: 10px;

  @media screen and (max-width: 1023px) {
    justify-content: space-evenly;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    box-shadow: none;
    background-color: transparent;
    max-width: 100vw;
  }
`;

export const Invite = styled.div`
  height: 190px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: white;
  box-shadow: 0px 0px 5px 3px #0000004b;
  border-radius: 10px;

  @media screen and (max-width: 1023px) {
    font-size: 1.1rem;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.9rem;
    margin: 6px;
    width: 30vw;
  }
`;

export const Icon = styled.i`
  cursor: pointer;
`;

export const Name = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  font-size: 0.9rem;
`;

export const UsersWrapper = styled.div`
  color: black;
  max-width: 90vw;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 7px 0px 14px 1px rgba(0, 0, 0, 0.14);
  background-color: #216377;
  border-radius: 10px;

  @media screen and (max-width: 1023px) {
    justify-content: space-evenly;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    box-shadow: none;
    background-color: transparent;
    max-width: 100vw;
  }
`;

export const User = styled.div`
  height: 190px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: white;
  box-shadow: 0px 0px 5px 3px #0000004b;
  border-radius: 10px;

  @media screen and (max-width: 1023px) {
    font-size: 1.1rem;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.9rem;
    margin: 6px;
    width: 30vw;
  }
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px 5px 3px #0000002b;
`;
export const AddUserButton = styled.div`
  padding: 5px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px #0000004e;
  background-color: white;
  transition: all 0.2s ease;
  transform: scale(1);
  cursor: pointer;

  &:active {
    transition: all 0.2s ease;
    transform: scale(1.05);
  }

  @media screen and (max-width: 1023px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

export const DecideWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 0px 5px 3px #0000004e;
  border-radius: 10px;
  transition: all 0.2s ease;
  transform: scale(1);

  &:active {
    transition: all 0.2s ease;
    transform: scale(1.1);
  }
`;
