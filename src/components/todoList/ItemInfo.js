import React, {useState} from 'react';
import {Modal, Input} from "antd";

const { TextArea } = Input;

const ItemInfoModal = ({
    item,
    handleCancel,
    isVisible,
    setVisible,
    updateItems
}) => {
    const [text, setText] = useState(item.info || '');


    const handleOk = () => {
      const tempItem = {...item};
      tempItem.info = text;
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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ItemInfoModal;
