import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  color: black;

  position: relative;
  @media screen and (max-width: 1023px) {
    margin-top: -8vh;
    left: 0;
  }
  @media screen and (max-width: 767px) {
    margin-top: -50px;
  }
`;

export const Vita = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 60vw;
  height: 70vh;
  flex-wrap: wrap;
  overflow: hidden;

  background-color: red;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;

  height: 170px;
  width: 130px;

  height: 250px;
  width: 200px;
  margin: 40px;

  background-color: aqua;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 130px;
  height: 130px;
  box-shadow: 0px 0px 5px 3px #0000002b;
`;

export const Name = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  font-size: 0.9rem;
`;
