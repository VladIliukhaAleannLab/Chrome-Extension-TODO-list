import React, {useState, createContext} from 'react';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body, html {
        height: var(--appHeight);
        width: var(--appWidth);
    }
    :root {
        ${({style}) => Object.entries(style).map(([key, value]) => `${key}: ${value};`)}
    }

`;

const variables = {
    '--mainColor': 'white',
    '--secondColor': 'black',
    '--modalbg': '#54575b',
    '--btnbg': '#747474',
    '--mainbg': '#282c34',
    '--btnPrimaryHover': 'red',
    '--secondbg': '#111111',
    '--removeBtn': 'red',
    '--modalLine': 'red',
    '--scrollbg': 'red',
    '--inputFocus': '#ff00008f',
    '--todoListMainColor': 'orangered',
    '--todoColor': 'greenyellow',
    '--todoBorderColor': '#adff2f40',
    '--inProgressColor': 'gold',
    '--inProgressBorderColor': '#ffd70040',
    '--completeColor': 'white',
    '--completeBorderColor': '#ffffff40',
    '--textareabg': '#383a3e',
    '--datecolor': '#ffffffbf',
    '--appHeight': '320px',
    '--appWidth': '220px',
    '--heightList': '230px',
    '--heightOverflowList': '60px',
    '--widthItem': '99%',
    '--marginItem': '2px auto'
};

const SMALL_SIZE = {
    '--appHeight': '320px',
    '--appWidth': '220px',
    '--heightList': '230px',
    '--heightOverflowList': '60px',
    '--widthItem': '99%',
    '--marginItem': '2px auto'
};

const BIG_SIZE = {
    '--appHeight': '500px',
    '--appWidth': '500px',
    '--heightList': '415px',
    '--heightOverflowList': '116px',
    '--widthItem': 'auto',
    '--marginItem': '2px 40px'
};

const styleJSON = {
  size: {
      small: SMALL_SIZE,
      big: BIG_SIZE
  }
};


export const StyleContext = createContext(variables);

const StyleWrap = ({children}) => {
    const [style, _setStyle] = useState(variables);

    const setStyle = (val) => {
        _setStyle({...style, ...val})
    };

    const contextValue = {
        style,
        setStyle,
        styleJSON
    };

    return (
        <>
            <GlobalStyle style={style}/>
            <StyleContext.Provider value={contextValue}>
                {children}
            </StyleContext.Provider>
        </>
    )
};

export default StyleWrap;
