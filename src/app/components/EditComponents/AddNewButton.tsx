import React from 'react';
import { EditText } from 'react-edit-text';

const AddNewButton = () => {
    return (
        // text
        <div className='mt-2 '>
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
            />
        </div>
    );
};

export default AddNewButton;
