import React from 'react';
import DraggableColumnComponent from './draggables/DraggableColumnComponent';

const AddButton = ({ entries, setEntries }: any) => {
    return (
        <div className='flex justify-center mb-2'>
            <DraggableColumnComponent entries={entries} setEntries={setEntries} />
        </div>
    );
};

export default AddButton;
