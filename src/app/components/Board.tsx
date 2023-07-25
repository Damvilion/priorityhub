import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getBoard } from '../redux/boardState';
import { getDataByColumn } from '../lib/getDataByColumn';
import Column from './Column';
import { entriesToColumn } from '../lib/entriesToColumn';
import { MockData } from '../lib/mockData/MockData';

function Board() {
    const { board } = useSelector((state: RootState) => state.board);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [renderBoard, setRenderBoard] = useState([1, 2, 3]);
    const dispatch = useDispatch();
    const [entries, setEntries] = useState<any>({});

    useEffect(() => {
        const getEntries = async () => {
            const data = await entriesToColumn();
            setEntries(data);
        };
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
                                ? Object.keys(entries).map((item, index) => (
                                      <Column
                                          key={item}
                                          index={index}
                                          item={item}
                                          content={entries[`${item}`]['content']}
                                          draggableId={`${item} firebase`}
                                      />
                                  ))
                                : Object.keys(MockData).map((item, index) => (
                                      <Column
                                          //   key={`${item} data`}
                                          key={item}
                                          index={index}
                                          item={item}
                                          content={MockData[`${item}`]['content']}
                                          draggableId={`${item} data`}
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
