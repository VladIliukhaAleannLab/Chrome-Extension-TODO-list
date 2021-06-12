import {createStore, combineReducers} from 'redux'
import stylesReducer from "./stylesReducer";
import listReducer from "./listReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    styles: stylesReducer,
    todoList: listReducer,
    user: userReducer
});

export const store = createStore(rootReducer);
