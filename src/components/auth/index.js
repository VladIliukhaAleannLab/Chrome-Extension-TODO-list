import React, {useState} from 'react';
import {Button, Input} from "antd";
import {useDispatch} from 'react-redux'
import useTextField from "../../hooks/useTextField";
import {checkUser, setUser} from "../../reducers/userReducer";
import './style.css'

export default ({user}) => {
    const dispatch = useDispatch();

    const [isLogin, setLogin] = useState(true);

    const loginInput = useTextField('');
    const passwordInput = useTextField('');

    const onLogin = () => {
      const user = {
          name: loginInput.value,
          password: passwordInput.value,
      };
      dispatch(checkUser(user));
    };

    const onSignIn = () => {
        console.log('test')
    };

    return (
        <div className={'wrap-auth'}>
            <div>Login</div>
            <Input style={{marginBottom: '10px'}} {...loginInput}/>

            <div>Password</div>
            <Input style={{marginBottom: '15px'}} {...passwordInput}/>
            {user.message && <div className={'err-message'}>{user.message}</div>}
            <Button onClick={isLogin ? onLogin : onSignIn }>{isLogin ? 'Login' : 'Sign In'}</Button>
        </div>
    )
}
