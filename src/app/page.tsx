'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from '../../firebase-config';

export default function Home() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/register');
        }
    }, []);

    return (
        <main className='h-screen flex flex-col justify-center items-center'>
            <h1>Main</h1>
            <button onClick={() => router.push('/register')}>Register</button>
        </main>
    );
}
