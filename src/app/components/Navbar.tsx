import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between p-5 text-black'>
            <h1>Priority Hub</h1>
            <div className='border border-black border-solid p-2'>
                <input type='text' className='outline-none' placeholder='Search' />
            </div>
        </nav>
    );
};

export default Navbar;
