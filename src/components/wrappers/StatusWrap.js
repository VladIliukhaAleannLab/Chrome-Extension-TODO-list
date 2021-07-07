import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../reducers/userReducer";
import {checkServer, syncListItems, syncListItemsForBtn} from "../../api";
import {Input, Modal, Tooltip} from "antd";
import {setList} from "../../reducers/listReducer";
import {getLocalStoreItem, updateLocalStorage} from "../../helpers";
import useTextField from "../../hooks/useTextField";

export default ({children}) => {
    const [isLoad, setLoad] = useState(false);
    const [isOnline, setOnline] = useState(false);
    const [isSettingsVisible, setSettingsVisible] = useState(false);

    const timeout = useRef(null);
    const syncTimout = useRef(null);
    const debounceSync = useRef(null);

    const {user} = useSelector(state => ({items: state.todoList, ...state}));

    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch(logOut())
    };

    const onCheckServer = async () => {
        const isStatus = await checkServer();
        setOnline((prevState) => {
            if (!prevState && isStatus) {
                if (debounceSync.current) clearTimeout(debounceSync.current);
                debounceSync.current = setTimeout(() => onSyncList(false).then(), 500)
            }
            return isStatus
        });
        setLoad(true);
        timeout.current = setTimeout(async () => await onCheckServer(), 20000)
    };

    const onSyncList = async (isTimout = true) => {
        const items = getLocalStoreItem('todoList');
        const res = await syncListItems(user.name, items);
        if (res?.status) {
            dispatch(setList(res.list));
        }
        if (isTimout) {
            syncTimout.current = setTimeout(async () => await onSyncList(), 180000)
        }
    };

    const syncList = async () => {
        const res = await syncListItemsForBtn(user.name);
        if (res?.status) {
            dispatch(setList(res.list));
        }
    };

    useEffect(() => {

        onCheckServer().then();
        const timeOut = setTimeout(() => onSyncList().then(), 180000);
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
            if (syncTimout.current) {
                clearTimeout(syncTimout.current)
            }
            if (timeOut) {
                clearTimeout(timeOut)
            }
        }
    }, []);

    return (
        <>
            <Tooltip
                title={
                    !isSettingsVisible && <div>
                        {isOnline && <div className={'cursor'} onClick={syncList}>Sync</div>}
                        <div className={'cursor'} onClick={() => setSettingsVisible(true)}>Settings</div>
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
                    {isSettingsVisible && <Settings isVisible={isSettingsVisible} setVisible={setSettingsVisible}/>}
                </div>
            </Tooltip>
            {children}
        </>
    )
}


const Settings = ({isVisible, setVisible, handleOk, handleCancel}) => {
    const style = {position: 'absolute', top: '0', zIndex: 1000};
    const apiUrlInput = useTextField(getLocalStoreItem('api_url') || '');

    const onHandlerApiUrl = (e) => {
        apiUrlInput.onChange(e);
        updateLocalStorage('api_url', e.target.value);
    };

    return (
        <div className={'absolute'}>
            <Modal
                trigger={'click'}
                title={
                    <>
                        <div>
                            Settings
                        </div>
                    </>
                }
                style={style}
                visible={isVisible}
                onOk={handleOk ? handleOk : () => setVisible(false)}
                onCancel={handleCancel ? handleCancel : () => setVisible(false)}
            >
                <div>
                    <div className={'main-color'}>Api Url</div>
                    <Input value={apiUrlInput.value} onChange={onHandlerApiUrl}/>
                </div>
            </Modal>
        </div>
    )
}
