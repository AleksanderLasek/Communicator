import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 5px 3px #0000004e;
`
export const UsersWrapper = styled.div`
    color: black;
    width: 90vw;
    height: 80vh;
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #2e3452;
    &::-webkit-scrollbar{
        width: 0;
    }
    
`
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
`
export const Avatar = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
`
export const AddUserButton = styled.div`
    padding: 5px 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 3px #0000004e;
    background-color: white;
`