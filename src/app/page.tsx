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
    const { currentUser } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;
                const userdata = { displayName, email, photoURL, uid };
                dispatch(setUser(userdata));
            } else {
                dispatch(setUser(null));
                router.push('/register');
            }
        });

        return () => {
            unSub();
        };
    }, []);

    if (!currentUser) {
        return (
            <div className='flex h-screen bg-black items-center justify-center'>
                <h1>Not Authorized</h1>
            </div>
        );
    }
    return (
        <main className='bg-white text-black'>
            <Navbar />
            <Board />
        </main>
    );
}
