'use client';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { setUser } from '@/app/redux/user';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const Login = () => {
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(false);
    const [loginEmail, setLoginUpEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, loginEmail, password);
            const { displayName, email, photoURL, uid } = res.user;
            const userdata = { displayName, email, photoURL, uid };
            dispatch(setUser(userdata));
            setPassword('');
            setLoginUpEmail('');
            setLoading(false);
            router.push('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <main className='h-screen bg-[#121212] flex justify-center items-center'>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col bg-[#303443] p-10 gap-2'>
                    <label>Email</label>
                    <input
                        type='email'
                        value={loginEmail}
                        onChange={(e) => {
                            setLoginUpEmail(e.target.value);
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
                    {/* <button type='submit' className='bg-gradient-to-r from-blue-500 to-purple-400 p-2 rounded-sm'>
                        login
                    </button> */}
                    <Button color='secondary' type='submit' isLoading={loading}>
                        Login
                    </Button>
                    <div className='mx-auto text-xs'>
                        New?{' '}
                        <Link className='text-blue-400' href='/register'>
                            register
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
