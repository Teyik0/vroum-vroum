'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, sessionAtom } from '@/utils/context';
import { login } from '@/utils/users.actions';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [loginForm, setLoginForm] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const handleClick = async () => {
    const { username, password } = loginForm;
    const user = await login(username, password);
    console.log(user);
    if (user.authToken !== null) {
      setSession(user as User);
      toast.success('Vous êtes connecté');
    }
  };

  return (
    <section className='flex flex-col justify-center items-center py-32 px-4'>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='username'>Username</Label>
        <Input
          type='text'
          placeholder='ex: admin'
          value={loginForm?.username}
          onChange={(e) =>
            setLoginForm({ ...loginForm, username: e.target.value })
          }
        />
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5 mt-4'>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          placeholder=''
          value={loginForm?.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
      </div>
      <button
        className='h-12 bg-blue-600 text-white text-xl rounded-lg flex justify-center items-center
     hover:bg-blue-900 ease-in-out duration-300 mt-8 max-w-sm w-full'
        onClick={handleClick}
      >
        Log in
      </button>
    </section>
  );
};

export default Login;
