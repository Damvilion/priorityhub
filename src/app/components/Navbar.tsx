import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase-config';

const Navbar = () => {
    const handleSignOut = () => {
        signOut(auth);
    };
    return (
        <nav className='flex justify-between p-5 text-black'>
            <h1>Priority Hub</h1>
            <button onClick={handleSignOut}>Sign Out</button>
            <div className='border border-black border-solid p-2'>
                <input type='text' className='outline-none' placeholder='Search' />
            </div>
        </nav>
    );
};

export default Navbar;
