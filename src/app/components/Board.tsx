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
import DraggableColumnComponent from './draggables/DraggableColumnComponent';

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

        if (type === 'column' && currentUser) {
            const boardCopy = [...board];
            let temp = boardCopy.splice(source.index, 1)[0];
            boardCopy.splice(destination.index, 0, temp);
            dispatch(setBoard(boardCopy));
        } else if (type === 'column' && !currentUser) {
            const boardCopy = [...board];
            let temp = boardCopy.splice(source.index, 1)[0];
            boardCopy.splice(destination.index, 0, temp);
            dispatch(setBoard(boardCopy));
        }

        if (type === 'DEFAULT' && !currentUser) {
            const boardCopy = JSON.parse(JSON.stringify(board));
            boardCopy.map((item: DocumentEntry) => {
                if (source.droppableId === item.columnName) {
                    const newData = item.content.splice(source.index, 1);
                    boardCopy.map((item: DocumentEntry) => {
                        if (destination.droppableId === item.columnName) {
                            item.content.splice(destination.index, 0, newData[0]);
                        }
                    });
                    dispatch(setBoard(boardCopy));
                } else {
                    return item;
                }
            });
        } else if (type === 'DEFAULT' && currentUser) {
            const boardCopy = JSON.parse(JSON.stringify(board));
            boardCopy.map((item: DocumentEntry) => {
                if (source.droppableId === item.columnName) {
                    const newData = item.content.splice(source.index, 1);

                    boardCopy.map((item: DocumentEntry) => {
                        if (destination.droppableId === item.columnName) {
                            item.content.splice(destination.index, 0, newData[0]);
                        }
                    });
                    dispatch(setBoard(boardCopy));
                } else {
                    return item;
                }
            });
        }
        updateBoardData();
        updateLocalStorage();
    };

    return (
        <div className='flex flex-col p-1'>
            <div className='flex justify-center'>
                <DraggableColumnComponent />
            </div>
            <div className='flex overflow-x-auto z-50 items-center relative'>
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId='board' direction='horizontal' type='column'>
                        {(provided) => (
                            <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                                {board.map((item: DocumentEntry, index: number) => (
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
        </div>
    );
}

export default Board;
