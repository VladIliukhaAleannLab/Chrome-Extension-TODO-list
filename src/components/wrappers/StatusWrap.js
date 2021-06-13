import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../reducers/userReducer";
import {checkServer} from "../../api";
import {Tooltip} from "antd";

export default ({children}) => {
    const [isLoad, setLoad] = useState(false);
    const [isOnline, setOnline] = useState(false);

    const timeout = useRef(null);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch(logOut())
    };

    const onCheckServer = async () => {
        const isStatus = await checkServer();
        setOnline(isStatus);
        setLoad(true);
        timeout.current = setTimeout(async () => await onCheckServer(), 20000)
    };

    useEffect(() => {
        onCheckServer().then();
        return () => {
            if (timeout.ref) {
                clearTimeout(timeout.current)
            }
        }
    }, []);

    return (
        <>
            <Tooltip title={<span className={'cursor'} onClick={onLogOut} >Logout</span>}>
                <div className={'status'}>
                    <span>{user && user.name && user.name}</span>
                    {isLoad && <div>
                        {
                            isOnline ? (
                                <div className={'online'}>online</div>
                            ) : (
                                <div className={'offline'}>offline</div>
                            )
                        }
                    </div>}
                </div>
            </Tooltip>
            {children}
        </>
    )
}
