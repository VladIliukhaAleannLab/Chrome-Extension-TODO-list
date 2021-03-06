import React from 'react';
import {Modal, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {updateListItem} from "../../reducers/listReducer";
import useTextField from "../../hooks/useTextField";
import {createOtUpdateItem} from "../../api";

const { TextArea } = Input;

const ItemInfoModal = ({
    item,
    handleCancel,
    isVisible,
    setVisible
}) => {
    const textArea = useTextField(item.info);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const updateItems = (item) => {
        user.name && createOtUpdateItem(item, 'put');
        dispatch(updateListItem(item))
    };

    const handleOk = () => {
      const tempItem = {...item};
      tempItem.info = textArea.value;
      updateItems(tempItem);
      setVisible(false)
    };

    const style = {position: 'absolute', top: '0'};

    return (
        <div className={'absolute'}>
            <Modal
                title={
                    <>
                        <div>
                            {item.text}
                        </div>
                        <div className={'date'}>
                            {item.createDate ? item.createDate.split('GMT')[0] : ''}
                        </div>
                    </>
                }
                style={style}
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleCancel ? handleCancel : () => setVisible(false)}
            >
                <div>
                    <TextArea
                        className={'text-area'}
                        rows={9}
                        {...textArea}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ItemInfoModal;
