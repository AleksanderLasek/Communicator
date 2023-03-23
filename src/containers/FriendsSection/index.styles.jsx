import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 5px 3px #0000004e;

  @media screen and (max-width: 1023px) {
    box-shadow: none;
  }

  @media screen and (max-width: 767px) {
  }
`;

export const UsersWrapper = styled.div`
  color: black;
  width: 90vw;
  height: 80vh;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #2e3452;
  &::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: 1023px) {
    border: 0;
    background-color: transparent;
    box-shadow: none;
    height: 100vh;
    padding-bottom: 50px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const User = styled.div`
  width: 80%;
  height: auto;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px 3px #0000004e;
  background-color: #81229449;

  @media screen and (max-width: 1023px) {
    background-color: rgb(223, 246, 255);
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.1rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.9rem;
    width: 100%;
    margin: 6px;
  }
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  @media screen and (max-width: 1023px) {
    box-shadow: 0px 0px 2px 2px #0000004e;
  }
`;
export const AddUserButton = styled.div`
  padding: 5px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px #0000004e;
  background-color: white;
  transition: all 0.2s ease;
  transform: scale(1);
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
