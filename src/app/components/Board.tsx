import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getBoard } from '../redux/boardState';
import { getDataByColumn } from '../lib/getDataByColumn';
import Column from './Column';

function Board() {
    const { board } = useSelector((state: RootState) => state.board);
    const [renderBoard, setRenderBoard] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getColumn = async () => {
            const data = await getDataByColumn();
            setRenderBoard(data);
        };
        getColumn();
    }, []);

    const handleDrag = () => {};

    return (
        <div>
            {/* <button onClick={getData} className='bg-red-500'>
                Get data
            </button> */}

            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='board' direction='horizontal' type='column'>
                    {(provided) => (
                        <div className={`grid grid-cols-${renderBoard.length}`} ref={provided.innerRef} {...provided.droppableProps}>
                            {renderBoard.map((item: any, index) => (
                                <Column key={item.id} index={index} id={item.id} text={item.status} />
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
