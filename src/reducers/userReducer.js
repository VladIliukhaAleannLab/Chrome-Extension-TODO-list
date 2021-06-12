import {getLocalStoreItem, updateLocalStorage} from "../helpers";

const INIT_STATE = {
    isLogin: false,
    message: '',
};

const USERS = {
  'Jolly Roger': '12345'
};

// types
const SET_USER = 'SET_USER';
const CHECK_USER = 'CHECK_USER';


// reducer
export default (state = getDefaultState(), action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_USER:
            updateLocalStorage('user', payload);
            return payload;
        case CHECK_USER:
            if (USERS[payload['name']] === payload['password']) {
                const user = {...INIT_STATE, isLogin: true, ...payload};
                updateLocalStorage('user', user);
                return user;
            } else {
                return {
                    ...INIT_STATE,
                    name: payload['name'],
                    message: USERS[payload['name']] ? 'wrong password' : 'wrong name'
                }
            }

        default:
            return state;
    }
}

const getDefaultState = () => {
    const cacheItem = getLocalStoreItem('user');
    if (cacheItem) return cacheItem;
    return INIT_STATE
};


// actions
export const setUser = (user) => ({type: SET_USER, payload: user});

export const checkUser = (user) => ({type: CHECK_USER, payload: user});
