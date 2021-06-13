import React from 'react';
import './App.css';
// import './variables.css'
import 'antd/dist/antd.css';
import domAction from "./dom/domAction";
import TodoList from "./components/todoList";
import bgAction from "./dom/bgAction";
import FlameBG from "./components/canvas/FlameBG";
import {useSelector} from "react-redux";
import Auth from "./components/auth";
import StatusWrap from "./components/wrappers/StatusWrap";

function App() {

    const user = useSelector(state => state.user);

    return (
        <div className="App">
            <FlameBG />
            {
                user.isLogin ? (
                    <StatusWrap>
                        <TodoList/>
                    </StatusWrap>
                ) : (
                    <Auth user={user}/>
                )
            }
        </div>
    );
}

export default App;
