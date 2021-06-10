import {getLocalStoreItem, updateLocalStorage} from "../helpers";

const defaultState = {
    '--mainColor': 'white',
    '--secondColor': 'black',
    '--modalbg': 'linear-gradient( 32deg, #3c170c 0%, #111 100% )',
    '--btnbg': '#37160d',
    '--mainbg': '#7c2105',
    '--btnPrimaryHover': 'red',
    '--secondbg': '#111111',
    '--removeBtn': 'red',
    '--modalLine': 'red',
    '--scrollbg': '#ff45004f',
    '--inputFocus': '#ff00008f',
    '--todoListMainColor': 'orangered',
    '--todoColor': 'greenyellow',
    '--todoBorderColor': '#adff2f40',
    '--inProgressColor': 'gold',
    '--inProgressBorderColor': '#ffd70040',
    '--completeColor': 'white',
    '--completeBorderColor': '#ffffff40',
    '--textareabg': 'linear-gradient( 57deg,#23130f 0%,#2e150d 100% )',
    '--datecolor': '#ffffffbf',
    '--appHeight': '320px',
    '--appWidth': '220px',
    '--heightList': '230px',
    '--heightOverflowList': '60px',
    '--widthItem': '99%',
    '--marginItem': '2px auto',
    '--maxWidthModalTitle': '90%',
    '--minWidthDroppableList': '18px',
    '--thumbdbg': 'orangered'
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

