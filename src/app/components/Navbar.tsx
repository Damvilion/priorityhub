import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase-config';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const handleSignOut = () => {
        signOut(auth);
    };
    const router = useRouter();

    const { currentUser } = useSelector((state: RootState) => state.user);
    const handleSignIn = () => {
        router.push('/login');
    };

    return (
        <nav className='flex justify-between p-5 text-black'>
            <h1>Priority Hub</h1>
            {/* <button onClick={handleSignOut}>Sign Out</button> */}
            <div className='flex gap-1 items-center'>
                <div className='border border-black border-solid p-2'>
                    <input type='text' className='outline-none' placeholder='Search' />
                </div>
                <div className='p-4'>
                    {currentUser ? (
                        <Menu>
                            <Menu.Button>Account</Menu.Button>
                            <Menu.Items>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a onClick={handleSignOut} className={`${active && 'bg-blue-500'}`}>
                                            signout
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    ) : (
                        <Menu>
                            <Menu.Button>Login</Menu.Button>
                            <Menu.Items>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a onClick={handleSignIn} className={`${active && 'bg-blue-500'}`}>
                                            sign in
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
