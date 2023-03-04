import styled, { css }from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color:${props => props.pageTheme ? "#256D85" : "#071216"};
`
