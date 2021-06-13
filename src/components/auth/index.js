import React, {useState} from 'react';
import {Button, Input} from "antd";
import {useDispatch} from 'react-redux'
import useTextField from "../../hooks/useTextField";
import {checkUser} from "../../reducers/userReducer";
import './style.css'
import {authUser} from "../../api";

export default ({user}) => {
    const dispatch = useDispatch();

    const [isLogin, setLogin] = useState(true);

    const loginInput = useTextField('');
    const passwordInput = useTextField('');

    const onAuth = async () => {
        const user = {
          name: loginInput.value,
          password: passwordInput.value,
        };
        if (!isLogin) {
          user['isCreate'] = true
        }
        const res = await authUser(user);

        if (res.isUnavailable) {
            // global  no-restricted-globals
            res.isLogin = window.confirm(res.message);
            res.message = ''
        }
        dispatch(checkUser(res));
    };

    return (
        <div className={'wrap-auth'}>
            <div>Login</div>
            <Input style={{marginBottom: '10px'}} {...loginInput}/>

            <div>Password</div>
            <Input style={{marginBottom: '15px'}} {...passwordInput}/>
            {user.message && <div className={'err-message'}>{user.message}</div>}
            <Button onClick={onAuth}>{isLogin ? 'Log In' : 'Register'}</Button>
            <span>or</span>
            <span className={'cursor'} onClick={() => setLogin(!isLogin)}>{isLogin ? 'Register' : 'Log In'}</span>
        </div>
    )
}
