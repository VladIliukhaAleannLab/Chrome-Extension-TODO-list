import {getLocalStoreItem, updateLocalStorage} from "../helpers";

const INIT_STATE = {
    isLogin: false,
    message: '',
};

// types
const LOG_OUT = 'LOG_OUT';
const CHECK_USER = 'CHECK_USER';

// reducer
export default (state = getDefaultState(), action) => {
    const {type, payload} = action;
    switch (type) {
        case LOG_OUT:
            updateLocalStorage('user', payload);
            return payload;
        case CHECK_USER:
            if (payload['isLogin']) {
                const user = {...payload};
                updateLocalStorage('user', user);
                return user;
            } else {
                return payload
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
export const logOut = () => ({type: LOG_OUT, payload: INIT_STATE});

export const checkUser = (user) => ({type: CHECK_USER, payload: user});
