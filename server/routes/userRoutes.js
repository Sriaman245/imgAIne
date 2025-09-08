// CREATING API

import express from 'express'
import {registerUser,loginUser, userCredits, paymentRazorpay,verifyPayment} from '../controller/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)//when this api hits then it firstly run userAuth then userCredits
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
userRouter.post('/verify-razor',userAuth,verifyPayment)
//from userAuth it get userId then from throught userId we get credits through userCredits function

export default userRouter

// http://localhost:4000/api/user/register- if we use this api then registerUser function will work
// http://localhost:4000/api/user/login- if we use this api then loginUser function will work