import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Column from './Column';
import { MockData } from '../lib/mockData/MockData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';

function Board() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [entries, setEntries] = useState<any>([]);
    const getEntries = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const todos = docSnap.data();
            console.log(todos['data']);
            const data = todos['data'];
            setEntries(data);
        }
    };

    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            getEntries();
        }
    }, [currentUser]);

    const handleDrag = () => {};

    return (
        <div className='flex overflow-x-auto'>
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='board' direction='horizontal' type='column'>
                    {(provided) => (
                        <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                            {currentUser
                                ? entries.map((item: { columnName: String; content: String[] }, index: Number) => (
                                      <Column
                                          key={item.columnName}
                                          index={index}
                                          name={`${item.columnName}`}
                                          item={item}
                                          content={item.content}
                                          draggableId={`${item.columnName} firebase`}
                                      />
                                  ))
                                : MockData.map((item: { columnName: String; content: String[] }, index: Number) => (
                                      <Column
                                          key={item.columnName}
                                          index={index}
                                          name={`${item.columnName}`}
                                          item={item}
                                          content={item.content}
                                          draggableId={`${item.columnName} data`}
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
