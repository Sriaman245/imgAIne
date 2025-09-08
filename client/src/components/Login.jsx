import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  const [state,setState]=useState('Login');
  const {setShowLogin,backendUrl,setToken,setUser}=useContext(AppContext);
  
  // we creating below state variables so that we can store name,email and password from the form and send it to the backend through api
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  // when we submit the form then below function execute
  const onSubmitHandler=async(e)=>{
    e.preventDefault();//this will disbale the page loading while submitting
    try{
    // we have two option when state is login then we send only email and password to the backend 
    if(state==='Login'){
      const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
      if (data.success){
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token',data.token)
        setShowLogin(false)
      }
      else{
        toast.error(data.message)
      }
    }
    else{
      const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password})
      if(data.success){
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token',data.token)
        setShowLogin(false)
      }
      else{
        toast.error(data.message)
      }
    }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    document.body.style.overflow='hidden';//disbale the scrolling
    return ()=>{
        document.body.style.overflow='unset';//this is cleanup function used for unmounted i.e to enable the scrolling
    }
  },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-nuetral-700 font-medium'>{state}</h1>
        <p>Welcome back! Please {state!=='Login' ? 'sign in' : 'log in'} to continue</p>
        {state!=='Login' && <div className='flex border px-6 py-2 items-center gap-2 rounded-full mt-4'>
            <img src={assets.user_icon} alt="" />
            <input onChange={(e)=>(setName(e.target.value))} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required/>
        </div>}

        <div className='flex border px-6 py-2 items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt="" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email' required />
        </div>
        <div className='flex border px-6 py-2 items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
        </div>

        <p className='text-sm text-emerald-600 my-4 cursor-pointer'>Forgot Password</p>

        <button className='bg-emerald-600 w-full text-white py-2 rounded-full cursor-pointer'>{state!=='Login'?'Create Account':'Login'}</button>
        {state==='Login'
        ? <p className='mt-5 text-center'>Don't have an account? <span onClick={()=>{setState('Sign Up')}} className='text-emerald-600 cursor-pointer'>Sign up</span></p>
        : <p className='mt-5 text-center'>Already have an account? <span onClick={()=>setState('Login')} className='text-emerald-600 cursor-pointer'>login</span></p>}

        <img onClick={()=>{setShowLogin(false)}} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
      </form>
    </div>
  )
}

export default Login
