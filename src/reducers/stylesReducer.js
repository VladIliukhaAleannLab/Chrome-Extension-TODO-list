import {getLocalStoreItem, updateLocalStorage} from "../helpers";

const defaultState = {
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
    '--marginItem': '2px auto',
    '--maxWidthModalTitle': '90%',
    '--minWidthDroppableList': '18px',
};

const SMALL_SIZE = {
    '--appHeight': '320px',
    '--appWidth': '220px',
    '--heightList': '230px',
    '--heightOverflowList': '60px',
    '--widthItem': '99%',
    '--marginItem': '2px auto',
    '--maxWidthModalTitle': '90%',
    '--minWidthDroppableList': '18px',
};

const BIG_SIZE = {
    '--appHeight': '500px',
    '--appWidth': '500px',
    '--heightList': '415px',
    '--heightOverflowList': '116px',
    '--widthItem': 'auto',
    '--marginItem': '2px 40px',
    '--maxWidthModalTitle': '95%',
    '--minWidthDroppableList': '50px',
};

const SIZE = {
    big: BIG_SIZE,
    small: SMALL_SIZE
};


//types
const SET_SIZE = 'SET_SIZE';


// reducer
export default (state = getDefaultState(), action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_SIZE:
            updateLocalStorage('size', payload);
            return {
                ...state, ...SIZE[payload]
            };
        default:
            return state
    }
}

const getDefaultState = () => {
    const cacheType = getLocalStoreItem('size');
    if (cacheType) return {...defaultState, ...SIZE[cacheType]};
    return defaultState
};

// actions
export const setSize = (size) => ({type: SET_SIZE, payload: size});

