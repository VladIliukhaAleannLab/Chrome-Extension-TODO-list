import React from 'react'
import {Draggable, Droppable} from "react-beautiful-dnd";
import {DragItem} from "./DragItem";

const DroppableList = ({id, items, removeItem, updateItems}) => {
    const droppableStyle = {
        minHeight: '18px',
        marginBottom: '10px',
        overflow: 'auto'
    };
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div
                    className={'droppable-list'}
                    style={droppableStyle}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {items.map((item, index) => {


                        return (
                            <div
                                key={item.id}
                            >
                                <Draggable
                                    draggableId={`${item.id}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <DragItem
                                                item={item}
                                                removeItem={removeItem}
                                                updateItems={updateItems}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableList;
