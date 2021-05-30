import {createStore, combineReducers} from 'redux'
import stylesReducer from "./stylesReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
    styles: stylesReducer,
    todoList: listReducer
});

export const store = createStore(rootReducer);
