import React from 'react';
import {createGlobalStyle} from 'styled-components';
import {useSelector} from "react-redux";

const GlobalStyle = createGlobalStyle`
    body, html {
        height: var(--appHeight);
        width: var(--appWidth);
    }
    :root {
        ${({style}) => Object.entries(style).map(([key, value]) => `${key}: ${value};`)}
    }
`;

const StyleWrap = ({children}) => {
    const style = useSelector(state => state.styles);
    return (
        <>
            <GlobalStyle style={style}/>
            {children}
        </>
    )
};

export default StyleWrap;
