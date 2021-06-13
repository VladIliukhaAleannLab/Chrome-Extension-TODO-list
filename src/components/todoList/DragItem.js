import React, {memo, useState} from "react";
import ItemInfoModal from "./ItemInfo";
import {useDispatch, useSelector} from "react-redux";
import {removeListItem} from "../../reducers/listReducer";
import {createOtUpdateItem} from "../../api";

const DragItem = ({item}) => {
    const [isVisible, setVisible] = useState(false);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const removeItem = (itemId) => {
        user.name && createOtUpdateItem(item, 'delete');
        dispatch(removeListItem(itemId))
    };

    return (
        <span className={'item-wrap flex center'}>
            <span onClick={() => setVisible(true)}>{item.text}</span>
            <span className={'remove-btn'} onClick={() => removeItem(item.id)}> x </span>
            {
                isVisible && <ItemInfoModal
                    item={item}
                    isVisible={isVisible}
                    setVisible={setVisible}
                />

            }

        </span>
    )
};

export default memo(DragItem);
// export default DragItem
