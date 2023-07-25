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
    }, []);

    // interface Entries {
    //     done?: {};
    //     inprogress?: {};
    //     todo?: {};
    // }

    const handleDrag = () => {};

    return (
        <div className='flex overflow-scroll'>
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='board' direction='horizontal' type='column'>
                    {(provided) => (
                        <div className='flex' ref={provided.innerRef} {...provided.droppableProps}>
                            {currentUser
                                ? Object.keys(entries).map((item, index) => (
                                      <Column
                                          key={index}
                                          index={index}
                                          name={item}
                                          content={entries[`${item}`]['content']}
                                          // content={entries.get(item)['content']}
                                      />
                                  ))
                                : Object.keys(MockData).map((item, index) => (
                                      <Column
                                          key={index}
                                          index={index}
                                          name={item}
                                          content={MockData[`${item}`]['content']}
                                          // content={entries.get(item)['content']}
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
