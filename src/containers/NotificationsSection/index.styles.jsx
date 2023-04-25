import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const Notification = styled.div`
    width: 70vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    color: white;
    border-radius: 7px;
    box-shadow: 0px 0px 5px 3px #0000003e;
    background-color: #151a61;
    margin: 5px;
`
export const Avatar = styled.img`
    border-radius: 50%;
    height: 50px;
`
export const Text = styled.div`
    width: 50vw;
    display: flex;
    justify-content: center;
`