import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"


const Register = () => {
    const [message, setMessage] = useState(''); 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => console.log(data)
      const handleGoogleSignIn = () => {
        console.log('Google Signin')
      }
  return (
    <div className='h-[calc(100vh-120px)] border flex justify-center items-center '>
       <div className=' w-full max-w-sm mx-auto bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>
            Register to SmartBird 
        </h2>
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-black text-sm font-bold mb-2' htmlFor='email'>
                    Email
                </label>
                <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder='Enter Email plz :3' className='shadow appearance-none w-full border py-2 rounded px-3 leading-tight focus:outline-none focus:shadow '/>
                
            </div>
            <div className='mb-4'>
                <label className='block text-black text-sm font-bold mb-2' htmlFor='password'>
                Password
                </label>
                <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder='Enter Password plz :3' className='shadow appearance-none w-full border py-2 rounded px-3 leading-tight focus:outline-none focus:shadow '/>
                
            </div>
            {
                message && <p className='text-red-500 text-sm italic mb-3'>WRONG CREDENTIALS</p>
            }
            <div >
                <button className='bg-blue-400 hover:bg-primary text-white font-bold px-8 rounded focus:outline-none '>
                    Register
                </button>
            </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>
            Account? No problem! <Link to="/login" className='text-blue-400 hover:text-primary'>Login now~ </Link>
        </p>
        {/* google signin */}
        <div>
            <button onClick={handleGoogleSignIn}
             className='w-full flex flex-wrap gap-1 mt-2 items-center justify-center hover:bg-blue-400 bg-primary rounded '>
            <FaGoogle className='mr-2 '/>
            Log in with Google!
            </button>
        </div>

        <p className='mt-5 text-center text-black text-xs'>
            @2025 SmartBird. All rights reserved.
        </p>
       </div>
    </div>
  )
}

export default Register
