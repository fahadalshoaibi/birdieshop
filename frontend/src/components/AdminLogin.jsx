import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import axios from 'axios';



const AdminLogin = () => {
    const navigate = useNavigate(); 
    const [message, setMessage] = useState(''); 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('http://localhost:5000/api/auth/admin', data , 
                {
                    headers: {
                        'Content-Type': 'application/json',
                }}
            )    
            const auth = response.data;
            console.log(auth)
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Session expired, please login again')
                    navigate('/')


                }, 3600 * 3600 * 1000)
            
            }
            alert('Login successful, welcome admin!')
            navigate('/dashboard')
            
            

        } catch (error) {
            setMessage('Wrong Credentials sorry :(')
      }}
    return (
        <div className='h-screen border flex justify-center items-center '>
           <div className=' w-full max-w-sm mx-auto bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>
                Login to SmartBird 
            </h2>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-black text-sm font-bold mb-2' htmlFor='email'>
                        Username
                    </label>
                    <input {...register("username", { required: true })} type="text" name="username" id="username" placeholder='Enter User plz :3' className='shadow appearance-none w-full border py-2 rounded px-3 leading-tight focus:outline-none focus:shadow '/>
                    
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
                        Login
                    </button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>
                 No account? big problem! <Link to="/login" className='text-blue-400 hover:text-primary'>go here~ </Link>
            </p>
            
            
    
            <p className='mt-5 text-center text-black text-xs'>
                @2025 SmartBird. All rights reserved.
            </p>
           </div>
        </div>
      )
}

export default AdminLogin
