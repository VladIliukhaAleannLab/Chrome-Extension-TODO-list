import React from 'react';
import './style/todoList.css'
import DragArea from "./DragArea";

const TodoList = () => {
    return (
        <div className={'todo-list'}>
            <DragArea/>
        </div>
    )
};

export default TodoList
