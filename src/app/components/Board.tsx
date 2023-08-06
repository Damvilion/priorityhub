import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Column from './Column';
import { MockData } from '../lib/mockData/MockData';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

type Item = {
    columnName: String;
    content: String[];
};

function Board() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [entries, setEntries] = useState<Item[]>([]);
    const getEntries = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const customerData = docSnap.data();
            const data = customerData['data'];
            setEntries(data);
        }
    };

    useEffect(() => {
        if (currentUser) {
            getEntries();
        } else {
            setEntries(MockData);
        }
    }, [currentUser]);

    const handleDrag = (result: DropResult) => {
        const { destination, source, type } = result;
        if (!destination) return;

        if (type === 'column' && currentUser) {
            const every = entries;
            let temp = every.splice(source.index, 1)[0];
            every.splice(destination.index, 0, temp);
            setEntries(every);
        } else if (type === 'column' && !currentUser) {
            let temp = MockData.splice(source.index, 1)[0];
            MockData.splice(destination.index, 0, temp);
            setEntries(MockData);
        }

        if (type === 'DEFAULT' && !currentUser) {
            const every = entries;
            console.log(entries);
            console.log(source);
            console.log(destination);
            every.map((item: Item) => {
                if (source.droppableId === item.columnName) {
                    // const newData = item.content[source.index];
                    const newData = item.content.splice(source.index, 1);
                    console.log(newData[0]);

                    every.map((item: Item) => {
                        if (destination.droppableId === item.columnName) {
                            item.content.splice(destination.index, 0, newData[0]);
                        }
                    });
                    setEntries(every);
                } else {
                    return item;
                }
                console.log(entries);
            });
        } else if (type === 'DEFAULT' && currentUser) {
            const every = entries;
            every.map((item: Item) => {
                if (source.droppableId === item.columnName) {
                    // const newData = item.content[source.index];
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
    };

    const updateBoardData = async () => {
        const dataRef = doc(db, 'users', currentUser.uid);
        await updateDoc(dataRef, {
            data: [...entries],
        });
    };

    return (
        <div className='flex overflow-x-auto'>
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='board' direction='horizontal' type='column'>
                    {(provided) => (
                        <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                            {entries.map((item: Item, index: Number) => (
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
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Board;
