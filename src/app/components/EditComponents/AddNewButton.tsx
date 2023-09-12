import { setBoard } from '@/app/redux/boardState';
import { RootState } from '@/app/redux/store';
import React, { useState } from 'react';
import { EditText } from 'react-edit-text';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';

interface AddNewButtonProps {
    index: number;
}

const AddNewButton = ({ index }: AddNewButtonProps) => {
    const [editMode, setEditMode] = useState(false);
    const { board } = useSelector((state: RootState) => state.board);
    const [textValue, setTextValue] = useState('');
    const dispatch = useDispatch();

    const addItemToBoard = () => {
        if (!textValue) return;
        const boardCopy = JSON.parse(JSON.stringify(board));

        const newItem: Content = {
            uuid: uuid(),
            Title: textValue,
            Body: '',
            imgUrl: null,
        };

        boardCopy[index].content.push(newItem);
        dispatch(setBoard(boardCopy));
        setTextValue('');
    };
    const handleCancle = () => {
        setTextValue('');
        setEditMode(false);
    };
    return (
        // text
        <div className='mt-2 flex flex-col text-white'>
            <EditText
                style={{
                    borderRadius: '0.375rem', // Equivalent to Tailwind's rounded-md
                    width: '100%', // Equivalent to Tailwind's w-full
                    margin: '0 auto', // Equivalent to Tailwind's mx-auto
                    textAlign: 'center', // Equivalent to Tailwind's text-center
                    padding: '1.25rem', // Equivalent to Tailwind's p-5
                    marginBottom: '0.5rem', // Equivalent to Tailwind's m-2
                    display: 'flex',
                    transition: 'all 0.3s ease-in', // Equivalent to Tailwind's transition-all ease-in
                    backgroundColor: 'transparent',
                    color: 'white',
                }}
                className='text-[#aaa9a6] hover:bg-[#dfdedd]  transition-all ease-in'
                placeholder='Add New'
                onEditMode={() => setEditMode(true)}
                onBlur={() => setEditMode(false)}
                value={textValue}
                onChange={(e) => setTextValue(e.currentTarget.value)}
                onSave={addItemToBoard}
            />
            <div className=''>
                {editMode && (
                    <div className='flex items-center justify-between'>
                        <button onClick={addItemToBoard} className='text-white bg-purple-500 rounded-full py-2 px-4 mt-1'>
                            Add
                        </button>
                        {/* <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-8 h-8 text-white bg-red-700 rounded-full cursor-pointer p-1'
                            onClick={handleCancle}>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddNewButton;
