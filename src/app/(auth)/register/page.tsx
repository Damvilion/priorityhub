'use client';
import React, { FormEvent, FormEventHandler, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { setUser } from '@/app/redux/user';

const Register = () => {
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [signUpEmail, setSignUpEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, signUpEmail, password);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className='h-screen bg-[#121212] flex justify-center items-center'>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col bg-[#303443] p-10 gap-2'>
                    <label>Email</label>
                    <input
                        type='email'
                        value={signUpEmail}
                        onChange={(e) => {
                            setSignUpEmail(e.target.value);
                        }}
                        className='text-black p-2'></input>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className='text-black p-2'></input>
                    <p>forgot your password?</p>
                    <button type='submit' className='bg-gradient-to-r from-blue-500 to-purple-400 p-2 rounded-sm'>
                        register
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Register;
