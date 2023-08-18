'use client';
import React, { FormEvent, FormEventHandler, useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../../firebase-config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const router = useRouter();
    const [signUpEmail, setSignUpEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, signUpEmail, password);
            await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                email: signUpEmail,
                data: [
                    {
                        columnName: 'todo',
                        content: ['content number 1'],
                    },
                    {
                        columnName: 'in progress',
                        content: ['content number 2'],
                    },
                    {
                        columnName: 'done',
                        content: ['filler content'],
                    },
                ],
            });
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

                    <div className='font-light text-xs'>
                        Already have an account?{' '}
                        <Link className='inline-block' href='/login'>
                            <p>login</p>
                        </Link>
                    </div>

                    <button type='submit' className='bg-gradient-to-r from-blue-500 to-purple-400 p-2 rounded-sm'>
                        register
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Register;
