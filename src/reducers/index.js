import {createStore, combineReducers} from 'redux'
import stylesReducer from "./stylesReducer";

const rootReducer = combineReducers({
    styles: stylesReducer,

});

export const store = createStore(rootReducer);
