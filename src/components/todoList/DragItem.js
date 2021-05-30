import React, {useState} from "react";
import ItemInfoModal from "./ItemInfo";
import {useDispatch} from "react-redux";
import {removeListItem} from "../../reducers/listReducer";

export const DragItem = ({item}) => {
    const [isVisible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const removeItem = (itemId) => dispatch(removeListItem(itemId));

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
