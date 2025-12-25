import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js';
import { User } from '../models/user.model.js';

export const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'token not found'
            })
        }
        const decode = jwt.verify(token, ENV.JWT_SECRET)

        if(!decode){
            return res.status(401).json({
                message:"not decoded please check token"
            })
        }

        const user = await User.findById(decode.userId).select('-password')

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        req.user  = user

        next()
    } catch (error) {
        console.log(`erorr from protect Route,${error}`)
    }
}

export const adminRoute =async(req,res, next)=>{
    try {
        if(req.user && req.user.email===ENV.ADMIN){
            next()
        }
    } catch (error) {
        console.log(`error from admin route, ${error}`)
    }
}