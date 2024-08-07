import 'dotenv/config';
import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js';

const verifyToken = async(req,res,next) => {
    // console.log(req.headers)
    const token = req.headers.token || req.header('Authorization')?.replace('Bearer ', '').trim();
    // console.log(req.user)


    // console.log(token);

    if(!token){
        return res.status(401).json({
            message : "unothorized request or No token"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await User.findById(decoded?._id);
        // console.log(user);
        if(!user){
            return res.status(400).json({
                message:"invalid accesstoken"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Token is not valid"
        }), console.log(error);
    }
}

export {verifyToken}