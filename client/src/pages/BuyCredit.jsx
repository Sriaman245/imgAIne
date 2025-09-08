import { useContext } from 'react'
import React from 'react'
import {plans, assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {

  const {user,backendUrl,loadCreditsData,token,setShowLogin}=useContext(AppContext)
 
  // to initialize the payment
  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Credits Payment',
      description:'Credits Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response)=>{
        console.log(response);
        try{
          // below line will help in running the function verifyPayment
          const {data}=await axios.post(backendUrl+'/api/user/verify-razor',response,{headers:{token}})
          if(data.success){//if payemnt is true in transaction database
            loadCreditsData()
            navigate('/')
            toast.success('Credit Added')
          }
        }
        catch(error){
          toast.error(error.message)
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }
  // after payement done, we need to redirect the user to the home page
  const navigate=useNavigate()
  
  // when we click on Purchase button then below function executes and send data to backend 
  const paymentRazorpay=async (planId)=>{
    try{
      // if user is not logged in then we have to open login form
      if(!user){
        setShowLogin(true)
      }
      const {data}=await axios.post(backendUrl+'/api/user/pay-razor',{planId},{headers:{token}})//when we send token to middleware then middleware find the userId

      //if data is success then we initialize the payment(i.e open the razorpay payment gateway)
      if(data.success){
        initPay(data.order)//data.order get from the response of axios.post
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left '>
        {plans.map((item,index)=>(
        <div key={index}
        className='bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 w-75'>
          <img src={assets.logo_icon} alt="" className='w-15 h-20' />
          <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
          <p className='text-sm'>{item.desc}</p>
          <p className='mt-6'>
            <span className='text-3xl font-medium'>${item.price}</span>/{item.credits} credits</p>
            <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-5.2'>{user ? 'Purchase' : 'Get Started'}</button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default BuyCredit
