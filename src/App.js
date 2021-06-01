import React from 'react';
import './App.css';
// import './variables.css'
import 'antd/dist/antd.css';
import domAction from "./dom/domAction";
import TodoList from "./components/todoList";
import bgAction from "./dom/bgAction";
import FlameBG from "./components/canvas/FlameBG";


function App() {

    const test = async () => {
        await domAction('alert', {text: 'hello'})
    };

    window.test = test

    return (
        <div className="App">
            <FlameBG />
            <TodoList/>
        </div>
    );
}

export default App;
