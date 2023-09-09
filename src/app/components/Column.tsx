import React, { useContext, useEffect, useState } from 'react';
import { Draggable as BeautifulDraggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import AddNewButton from './EditComponents/AddNewButton';
import { useDispatch } from 'react-redux';
import { setBoard } from '../redux/boardState';

const Column = ({ index, content, draggableId, name, entries, setEntries }: any) => {
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [columnName, setColumnName] = useState(name);
    const handleColumnNameChange = () => {
        const boardCopy: DocumentEntry[] = JSON.parse(JSON.stringify(board));
        boardCopy[index].columnName = columnName;
        dispatch(setBoard(boardCopy));
    };

    const updateLocalStorage = () => {
        if (!currentUser) localStorage.setItem('board', JSON.stringify(board));
    };
    const updateBoardData = async () => {
        if (currentUser) {
            const dataRef = doc(db, 'users', currentUser.uid);
            await updateDoc(dataRef, {
                data: [...entries],
            });
        }
    };

    useEffect(() => {
        updateBoardData();
        updateLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);

    return (
        <div>
            <BeautifulDraggable draggableId={draggableId} index={index}>
                {(provided, Snapshot) => (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className=''>
                        <div
                            className={`${
                                Snapshot.draggingOver ? 'opacity-90' : ''
                            } bg-[#80008085] border p-5 m-2 md:w-[400px] w-[200px] group rounded-sm hover:opacity-85`}>
                            <div className='justify-center items-center gap-1'>
                                <EditText
                                    value={columnName}
                                    className='text-white'
                                    style={{ width: '100%', background: 'none', color: 'white' }}
                                    onChange={(e) => setColumnName(e.currentTarget.value)}
                                    onSave={handleColumnNameChange}
                                    onBlur={handleColumnNameChange}
                                />
                            </div>
                        </div>
                        <Droppable droppableId={name}>
                            {(provided, Snapshot) => (
                                <div
                                    className={`${
                                        Snapshot.draggingOverWith ? 'bg-pink-900 transition-all ease-in' : ''
                                    } shadow-md border border-solid w-[95%] p-5 mx-auto mb-5`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {content.map((item: Content, index: number) => (
                                        <Card
                                            index={index}
                                            title={item.Title}
                                            body={item.Body}
                                            imgUrl={item.imgUrl}
                                            key={item.Title}
                                            draggableId={item.Title}
                                        />
                                    ))}
                                    {provided.placeholder}

                                    <AddNewButton index={index} />
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </BeautifulDraggable>
        </div>
    );
};

export default Column;
