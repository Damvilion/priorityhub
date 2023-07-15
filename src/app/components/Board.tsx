import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getBoard } from '../redux/boardState';
import { getDataByColumn } from '../lib/getDataByColumn';

function Board() {
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();
    const getData = async () => {
        await dispatch(getBoard(getDataByColumn()));
    };
    const handlleDrag = () => {};

    return (
        <div className='flex flex-col'>
            {board} board
            <button onClick={getData} className='bg-red-500'>
                Get data
            </button>
            <DragDropContext onDragEnd={handlleDrag}>
                <Droppable droppableId='board' direction='horizontal'>
                    {(provided) => <div>{}</div>}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Board;
