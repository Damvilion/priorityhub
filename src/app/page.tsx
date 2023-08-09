'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser } from './redux/user';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Board from './components/Board';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;
                const userdata = { displayName, email, photoURL, uid };
                dispatch(setUser(userdata));
            } else {
                dispatch(setUser(null));
            }
        });

        return () => {
            unSub();
        };
    }, []);

    return (
        <main className='bg-black text-black relative'>
            <div className='absoultePositioning h-[300px] w-[80%] gradient-02 opacity-80 z-1' />
            <Navbar />
            <main className='h-screen relative z-50'>
                <Board />
            </main>
        </main>
    );
}
