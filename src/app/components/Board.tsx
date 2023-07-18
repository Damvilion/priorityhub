import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getBoard } from '../redux/boardState';
import { getDataByColumn } from '../lib/getDataByColumn';
import Column from './Column';
import { entriesToColumn } from '../lib/entriesToColumn';

function Board() {
    const { board } = useSelector((state: RootState) => state.board);
    const [renderBoard, setRenderBoard] = useState([1, 2, 3]);
    const dispatch = useDispatch();
    const [entries, setEntries] = useState({});

    useEffect(() => {
        const getColumn = async () => {
            const data = await getDataByColumn();
            setRenderBoard(data);
        };

        const getEntries = async () => {
            const data = await entriesToColumn();
            setEntries(data);
        };
        getColumn();
        getEntries();
    }, []);

    const handleDrag = () => {};

    return (
        <div className='flex overflow-scroll'>
            {/* <button onClick={getData} className='bg-red-500'>
                Get data
            </button> */}

            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='board' direction='horizontal' type='column'>
                    {(provided) => (
                        <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                            {Object.keys(entries).map((item, index) => (
                                <Column key={index} index={index} name={item} content={entries[`${item}`]['content']} />
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
