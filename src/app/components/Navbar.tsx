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
        <nav className='flex justify-between p-5 text-black items-center'>
            <h1 className='font-bold text-xl'>Priority Hub</h1>
            <div className='flex gap-1 items-center'>
                <div className='border border-black border-solid p-2'>
                    <input type='text' className='outline-none' placeholder='Search' />
                </div>
                <div className='p-4'>
                    {currentUser ? (
                        <Menu>
                            <Menu.Button className='border border-solid p-2 rounded-md hover:bg-slate-400'>Account</Menu.Button>
                            <Menu.Items>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div className='p-4 border shadow-md absolute mt-1 bg-white -ml-5'>
                                            <ul>
                                                <li>
                                                    <a onClick={handleSignOut} className={`${active && 'bg-blue-500'} relative p-2 rounded-md`}>
                                                        signout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    ) : (
                        <Menu>
                            <Menu.Button className='border border-solid p-2 rounded-md hover:bg-slate-400'>Login</Menu.Button>
                            <Menu.Items>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div className='p-4 border shadow-md absolute mt-1 bg-white -ml-5'>
                                            <ul>
                                                <li>
                                                    <a onClick={handleSignIn} className={`${active && 'bg-blue-500'} relative p-2 rounded-md`}>
                                                        sign in
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
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
