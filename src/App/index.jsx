import React, { useState } from "react";
import Header from "../components/Header";
import * as S from './index.styles';

const App = () => {
    const [swap, setSwap] = useState(false);
    const pageTheme = (data) => {
        setSwap(data);
    }
    return (
        <S.Wrapper pageTheme={swap}>
  
            <Header pageTheme={pageTheme}/>

        </S.Wrapper>
    )
}

export default App;