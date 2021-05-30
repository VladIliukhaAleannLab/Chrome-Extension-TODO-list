import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useDispatch} from "react-redux";
import {Input} from "antd";
import {hardCopy, getRandomInt, INIT_DATA} from "./helpers";
import DroppableList from "./DroppableList";
import {setSize} from "../../reducers/stylesReducer";

const TODO = 0;
const IN_PROGRESS = 1;
const COMPLETE = 2;


const DragArea = () => {
    const [items, _setItems] = useState(null);
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const cacheDate = JSON.parse(localStorage.getItem('todoList'));
            if (cacheDate && cacheDate.length > 0) {
                setItems(cacheDate)
            } else {
                setItems(INIT_DATA)
            }
        } catch (e) {
            setItems(INIT_DATA);
        }
        setLoading(false);

    }, []);


    useEffect(() => {
        // Mock an API call.
        items && buildAndSave(items);
    }, [items]);

    const setItems = (data) => {
        _setItems(data);
        localStorage.setItem('todoList', JSON.stringify(data))
    };

    const updateItems = (item) => {
        const tempItems = hardCopy(items);
        setItems(tempItems.map((list) => {
            return (
                {
                    ...list,
                    items: list.items.map((el) => {
                        if (el.id === item.id) {
                            return {...item}
                        } else {
                            return {...el}
                        }
                    })
                }
            )
        }))
    };

    const removeItem = (itemId) => {
        const tempItems = hardCopy(items);
        setItems(tempItems.map((list) => {
            return {
                ...list,
                items: list.items.filter(({id}) => id !== itemId)
            }
        }))
    };

    const buildAndSave = (items) => {
        const groups = {};
        for (let i = 0; i < Object.keys(items).length; ++i) {
            const currentGroup = items[i];
            groups[currentGroup.id] = i;
        }
        // Set the data.
        setItems(items);

        // Makes the groups searchable via their id.
        setGroups(groups);
    };

    if (loading) {
        return <span>Please wait</span>
    }

    return (
        <>
            <TopContainer />
            <Flow
                updateItems={updateItems}
                items={items}
                setItems={setItems}
                groups={groups}
                buildAndSave={buildAndSave}
                removeItem={removeItem}
            />
            <BottomContainer
                items={items}
                setItems={setItems}
            />
        </>
    );
};

const TopContainer = () => {
    const [sizeType, setTypeSize] = useState('small');
    const dispatch = useDispatch();


    useEffect(() => {
        let _size = localStorage.getItem('size');
        if (!_size) {
            _size = 'small'
        }
        _setSize(_size);
    }, []);

    const _setSize = (val) => {
        localStorage.setItem('size', val);
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

const BottomContainer = ({items, setItems}) => {
    const [text, setText] = useState('');
    const add = () => {
        if (text) {
            const tempItems = hardCopy(items);
            const newItem = {
                id: getRandomInt(),
                createDate: new Date().toString(),
                text,
            };
            tempItems[TODO].items = [newItem, ...tempItems[TODO].items];
            setItems(tempItems);
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


const Flow = ({
                  items,
                  setItems,
                  groups,
                  buildAndSave,
                  ...props
              }) => {

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
                            <List id={'Todo'} className={'todo'} items={items[TODO].items} {...props}/>
                            <List id={'In progress'} className={'in-progress'} items={items[IN_PROGRESS].items} {...props}/>
                            <List id={'Complete'} className={'complete'} items={items[COMPLETE].items} {...props}/>
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


