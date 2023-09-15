import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Column from './Column';
import { MockData } from '../lib/mockData/MockData';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useDispatch } from 'react-redux';
import { setBoard } from '../redux/boardState';
import AddNewColumn from './ModalComponents/AddNewColumn';

function Board(): React.JSX.Element {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();

    const getEntries = async () => {
        if (currentUser) {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const customerData = docSnap.data();
                const data = customerData['data'];
                dispatch(setBoard(data));
            }
        }
    };

    const renderMockData = () => {
        if (currentUser === null) {
            const storage = localStorage.getItem('board');
            if (storage) {
                dispatch(setBoard(JSON.parse(storage)));
            } else {
                localStorage.setItem('board', JSON.stringify(MockData));
                const storage = localStorage.getItem('board');
                dispatch(setBoard(JSON.parse(storage!)));
            }
        }
    };

    const updateBoardData = async () => {
        if (currentUser) {
            const dataRef = doc(db, 'users', currentUser.uid);
            await updateDoc(dataRef, {
                data: [...board],
            });
        }
    };

    const updateLocalStorage = () => {
        if (!currentUser) localStorage.setItem('board', JSON.stringify(board));
    };

    useEffect(() => {
        getEntries();
        renderMockData();
    }, [currentUser]);

    const handleDrag = (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) return;

        const boardCopy = type === 'column' ? [...board] : JSON.parse(JSON.stringify(board));

        if (type === 'column') {
            const temp = boardCopy.splice(source.index, 1)[0];
            boardCopy.splice(destination.index, 0, temp);
        } else if (type === 'DEFAULT') {
            let sourceItem: DocumentEntry | null = null;
            let destinationItem: DocumentEntry | null = null;
        
            for (const item of boardCopy) {
                if (source.droppableId === item.uuid) {
                    sourceItem = item;
                }
                if (destination.droppableId === item.uuid) {
                    destinationItem = item;
                }
            }
        
            if (sourceItem && destinationItem) {
                const newData = sourceItem.content.splice(source.index, 1);
                destinationItem.content.splice(destination.index, 0, newData[0]);
            }
        }

        dispatch(setBoard(boardCopy));
        updateBoardData();
        updateLocalStorage();
    };

    return (
        <div className='flex flex-col p-1'>
            <div className='flex justify-center'>
                <AddNewColumn />
            </div>
            <div className='flex overflow-x-auto z-50 items-center relative'>
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId='board' direction='horizontal' type='column'>
                        {(provided) => (
                            <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                                {board.map((item: DocumentEntry, index: number) => (
                                    <Column
                                        key={item.uuid}
                                        index={index}
                                        name={item.columnName}
                                        item={item}
                                        content={item.content}
                                        draggableId={item.uuid}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default Board;
