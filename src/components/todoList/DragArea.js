import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from "react-redux";
import {Input} from "antd";
import DroppableList from "./DroppableList";
import {setSize} from "../../reducers/stylesReducer";
import {addListItem, setList} from "../../reducers/listReducer";
import {getLocalStoreItem, getRandomInt} from "../../helpers";

const TODO = 0;
const IN_PROGRESS = 1;
const COMPLETE = 2;


const DragArea = () => {

    return (
        <>
            <TopContainer />
            <Flow />
            <BottomContainer />
        </>
    );
};

const TopContainer = () => {
    const [sizeType, setTypeSize] = useState('small');
    const dispatch = useDispatch();

    useEffect(() => {
        const cacheType = getLocalStoreItem('size');
        setTypeSize(cacheType || 'small');
    }, []);

    const _setSize = (val) => {
        dispatch(setSize(val));
        setTypeSize(val);
    };

    return (
        <div className={'top-container'}>
            <div
                className={'set-size'}
                onClick={() => _setSize(sizeType === 'small' ? 'big' : 'small')}
            >
                {sizeType === 'small' ? '+' : '-'}
            </div>
        </div>
    )
};

const BottomContainer = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const add = () => {
        if (text) {
            const newItem = {
                id: getRandomInt(),
                createDate: new Date().toString(),
                text,
            };
            dispatch(addListItem(newItem));
            setText('');
        }
    };

    return (
        <div className={'flex space-around margin-top-15'}>
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPressEnter={add}
            />
            <div className={'add-btn'} onClick={add}> Add</div>
        </div>
    )
};


const Flow = () => {

    const [groups, setGroups] = useState(null);

    const items = useSelector(state => state.todoList);
    const dispatch = useDispatch();

    useEffect(() => {
        buildAndSave(items)
    }, []);


    const setItems = (newList) => {
        dispatch(setList(newList));
        buildAndSave(items)
    };

    const buildAndSave = (items) => {
        const groups = {};
        for (let i = 0; i < Object.keys(items).length; ++i) {
            const currentGroup = items[i];
            groups[currentGroup.id] = i;
        }
        // Makes the groups searchable via their id.
        setGroups(groups);
    };

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const {destination, source, type,} = result;
                console.log(result);
                if (!destination) {
                    return;
                }

                if (destination.droppableId === source.droppableId && destination.index === source.index) {
                    return;
                }


                if ('group' === type) {
                    const sourceIndex = source.index;
                    const targetIndex = destination.index;

                    const workValue = items.slice();
                    const [deletedItem,] = workValue.splice(sourceIndex, 1);
                    workValue.splice(targetIndex, 0, deletedItem);

                    buildAndSave(workValue);

                    return;
                }

                const sourceDroppableIndex = groups[source.droppableId];
                const targetDroppableIndex = groups[destination.droppableId];
                const sourceItems = items[sourceDroppableIndex].items.slice();
                const targetItems = source.droppableId !== destination.droppableId ? items[targetDroppableIndex].items.slice() : sourceItems;

                // Pull the item from the source.
                const [deletedItem,] = sourceItems.splice(source.index, 1);
                targetItems.splice(destination.index, 0, deletedItem);

                const workValue = items.slice();
                workValue[sourceDroppableIndex] = {
                    ...items[sourceDroppableIndex],
                    items: sourceItems,
                };
                workValue[targetDroppableIndex] = {
                    ...items[targetDroppableIndex],
                    items: targetItems,
                };

                setItems(workValue);
            }}
        >
            <Droppable droppableId='ROOT' type='group'>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <div className={'wrap-list'}>
                            <List id={'Todo'} className={'todo'} items={items[TODO].items} />
                            <List id={'In progress'} className={'in-progress'} items={items[IN_PROGRESS].items} />
                            <List id={'Complete'} className={'complete'} items={items[COMPLETE].items} />
                        </div>


                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};


const List = ({id, className, ...props}) => {
    return (
        <div className={'wrap-item-list'}>
            <div>
                {id}
            </div>
            <div className={className + ' overflow-list'}>
                <DroppableList id={id} {...props}/>
            </div>
        </div>
    )
};


export default DragArea;


