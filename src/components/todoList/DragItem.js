import React, {useState} from "react";
import ItemInfoModal from "./ItemInfo";

export const DragItem = ({item, removeItem, updateItems}) => {
    const [isVisible, setVisible] = useState(false);

    return (
        <span className={'item-wrap flex center'}>
            <span onClick={() => setVisible(true)}>{item.text}</span>
            <span className={'remove-btn'} onClick={() => removeItem(item.id)}> x </span>
            {
                isVisible && <ItemInfoModal
                    item={item}
                    isVisible={isVisible}
                    setVisible={setVisible}
                    updateItems={updateItems}
                />

            }

        </span>
    )
};
