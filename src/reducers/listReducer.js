import {getLocalStoreItem, hardCopy, updateLocalStorage} from "../helpers";

const INIT_STATE = [
    {
        id: 'Todo',
        items: []
    },
    {
        id: 'In progress',
        items: []
    },
    {
        id: 'Complete',
        items: []
    }
];


// types
const SET_LIST = 'SET_LIST';
const UPDATE_ITEM = 'UPDATE_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_ITEM = 'ADD_ITEM';


// reducer
export default (state = INIT_STATE, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case SET_LIST:
            updateLocalStorage('todoList', payload);
            return payload;
        case UPDATE_ITEM:
            newState = state.map((list) => {
                return (
                    {
                        ...list,
                        items: list.items.map((el) => {
                            if (el.id === payload.id) {
                                return {...payload}
                            } else {
                                return {...el}
                            }
                        })
                    }
                )
            });
            updateLocalStorage('todoList', newState);
            return newState;

        case REMOVE_ITEM:
            newState = state.map((list) => {
                return {
                    ...list,
                    items: list.items.filter(({id}) => id !== payload)
                }
            });
            updateLocalStorage('todoList', newState);
            return newState;

        case ADD_ITEM:
            const TODO = 0;
            newState = hardCopy(state);
            newState[TODO].items = [payload, ...newState[TODO].items];
            updateLocalStorage('todoList', newState);
            return newState;

        default:
            return getState(state);
    }
}

const getState = (state) => {
    const cacheItem = getLocalStoreItem('todoList');
    if (cacheItem) return cacheItem;
    return state
};


// actions
export const setList = (newList) => ({type: SET_LIST, payload: newList});

export const updateListItem = (item) => ({type: UPDATE_ITEM, payload: item});

export const removeListItem = (itemId) => ({type: REMOVE_ITEM, payload: itemId});

export const addListItem = (newItem) => ({type: ADD_ITEM, payload: newItem});
