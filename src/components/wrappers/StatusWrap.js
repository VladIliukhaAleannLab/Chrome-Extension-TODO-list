import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../reducers/userReducer";
import {checkServer, syncListItems, syncListItemsForBtn} from "../../api";
import {Tooltip} from "antd";
import {setList} from "../../reducers/listReducer";

export default ({children}) => {
    const [isLoad, setLoad] = useState(false);
    const [isOnline, setOnline] = useState(false);

    const timeout = useRef(null);
    const syncTimout = useRef(null);

    const {items, user} = useSelector(state => ({items: state.todoList, ...state}));

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

    const onSyncList = async () => {

        const res = await syncListItems(user.name, items);
        if (res?.status) {
            dispatch(setList(res.list));
        }
        syncTimout.current = setTimeout(async () => await onSyncList(), 60000)
    };

    const syncList = async () => {
        const res = await syncListItemsForBtn(user.name);
        if (res?.status) {
            dispatch(setList(res.list));
        }
    };

    useEffect(() => {

        onCheckServer().then();
        onSyncList().then();
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
            if (syncTimout.current) {
                clearTimeout(syncTimout.current)
            }
        }
    }, []);

    return (
        <>
            <Tooltip title={
                <div>
                    {isOnline && <div className={'cursor'} onClick={syncList}>Sync</div>}
                    <div className={'cursor'} onDoubleClick={onLogOut} >Logout</div>
                </div>
            }>
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
