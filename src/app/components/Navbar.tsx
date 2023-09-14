import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase-config';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

const Navbar = () => {
    const handleSignOut = () => {
        signOut(auth);
    };
    const router = useRouter();

    const { currentUser } = useSelector((state: RootState) => state.user);
    const handleSignIn = () => {
        router.push('/login');
    };
    const items = [
        {
            key: 'new',
            label: 'Sign Out',
        },
    ];

    return (
        <nav className='flex justify-between p-5 text-black items-center relative'>
            <div className='absolute h-[300px] w-[80%] gradient-01 opacity-20 z-0' />
            <a href='/' className='relative z-1'>
                <h1 className='font-bold text-xl text-white'>Priority Hub</h1>
            </a>
            <div className='flex gap-1 items-center'>
                <div className='p-4'>
                    {currentUser ? (
                        // <Menu>
                        //     <Menu.Button className='bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-md ml-8'>
                        //         Account
                        //     </Menu.Button>
                        //     <Menu.Items>
                        //         <Menu.Item>
                        //             {({ active }) => (
                        //                 <div className='p-4 border shadow-md absolute mt-1 bg-white -ml-5'>
                        //                     <ul>
                        //                         <li>
                        //                             <a onClick={handleSignOut} className={`hover:bg-blue-500 relative p-2 rounded-md`}>
                        //                                 signout
                        //                             </a>
                        //                         </li>
                        //                     </ul>
                        //                 </div>
                        //             )}
                        //         </Menu.Item>
                        //     </Menu.Items>
                        // </Menu>

                        <Dropdown className='bg-purple-600'>
                            <DropdownTrigger>
                                <Button
                                    variant='bordered'
                                    // color='primary'

                                    className='bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-md ml-8'>
                                    Account
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Dynamic Actions' items={items}>
                                <DropdownItem key='signOut' color='secondary' onClick={handleSignOut}>
                                    Sign Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Dropdown className='bg-purple-600'>
                            <DropdownTrigger>
                                <Button
                                    variant='bordered'
                                    // color='primary'

                                    className='bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-md ml-8'>
                                    Login
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Dynamic Actions' items={items}>
                                <DropdownItem key='signOut' color='secondary' onClick={handleSignIn}>
                                    Sign in
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
