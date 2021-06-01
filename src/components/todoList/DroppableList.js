import React, {memo} from 'react'
import {Draggable, Droppable} from "react-beautiful-dnd";
import DragItem from "./DragItem";

const DroppableList = ({id, items}) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div
                    className={'droppable-list'}
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
                                            <DragItem item={item}/>
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

const memoList = memo(DroppableList);

export default memoList;
