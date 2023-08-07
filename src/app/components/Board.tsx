import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Column from './Column';
import { MockData } from '../lib/mockData/MockData';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

type Item = {
    columnName: string;
    content: string[];
};

function Board(): React.JSX.Element {
    const { currentUser } = useSelector((state: RootState) => state.user);
    console.log(currentUser);
    const [entries, setEntries] = useState<Item[]>([]);

    const getEntries = async () => {
        if (currentUser) {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const customerData = docSnap.data();
                const data = customerData['data'];
                setEntries(data);
            }
        }
    };

    const renderMockData = () => {
        if (currentUser === null) {
            const storage = localStorage.getItem('board');
            if (storage) {
                setEntries(JSON.parse(storage));
            } else {
                localStorage.setItem('board', JSON.stringify(MockData));
                const storage = localStorage.getItem('board');
                setEntries(JSON.parse(storage!));
            }
        }
    };

    useEffect(() => {
        getEntries();
        renderMockData();
    }, [currentUser]);

    const updateBoardData = async () => {
        if (currentUser) {
            const dataRef = doc(db, 'users', currentUser.uid);
            await updateDoc(dataRef, {
                data: [...entries],
            });
        }
    };

    const updateLocalStorage = () => {
        if (!currentUser) {
            localStorage.setItem('board', JSON.stringify(entries));
        }
    };

    const handleDrag = (result: DropResult) => {
        const { destination, source, type } = result;
        if (!destination) return;

        if (type === 'column' && currentUser) {
            const every = entries;
            let temp = every.splice(source.index, 1)[0];
            every.splice(destination.index, 0, temp);
            setEntries(every);
        } else if (type === 'column' && !currentUser) {
            const every = entries;
            let temp = every.splice(source.index, 1)[0];
            every.splice(destination.index, 0, temp);
            setEntries(every);
        }

        if (type === 'DEFAULT' && !currentUser) {
            const every = entries;
            every.map((item: Item) => {
                if (source.droppableId === item.columnName) {
                    const newData = item.content.splice(source.index, 1);
                    every.map((item: Item) => {
                        if (destination.droppableId === item.columnName) {
                            item.content.splice(destination.index, 0, newData[0]);
                        }
                    });
                    setEntries(every);
                } else {
                    return item;
                }
            });
        } else if (type === 'DEFAULT' && currentUser) {
            const every = entries;
            every.map((item: Item) => {
                if (source.droppableId === item.columnName) {
                    const newData = item.content.splice(source.index, 1);

                    every.map((item: Item) => {
                        if (destination.droppableId === item.columnName) {
                            item.content.splice(destination.index, 0, newData[0]);
                        }
                    });
                    setEntries(every);
                } else {
                    return item;
                }
            });
        }
        updateBoardData();
        updateLocalStorage();
    };

    return (
        <div className='flex overflow-x-auto'>
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='board' direction='horizontal' type='column'>
                    {(provided) => (
                        <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                            {entries.map((item: Item, index: number) => (
                                <Column
                                    key={item.columnName}
                                    index={index}
                                    name={item.columnName}
                                    item={item}
                                    content={item.content}
                                    draggableId={item.columnName}
                                />
                            ))}
                            {provided.placeholder}
                            {/* <div>
                                <span className='text-5xl'>HEY!</span>
                            </div> */}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Board;
