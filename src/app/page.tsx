'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser } from './redux/user';
import { useEffect } from 'react';

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

    return (
        <main className='h-screen flex flex-col justify-center items-center'>
            <h1>Main</h1>
            <button onClick={() => router.push('/register')}>Register</button>
            <button
                onClick={() => {
                    signOut(auth);
                    dispatch(setUser(null));
                }}>
                Sign out
            </button>
            <button onClick={() => console.log(currentUser)}>Log user </button>
        </main>
    );
}
