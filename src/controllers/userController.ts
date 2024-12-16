import { Request,Response } from "express";
import User from "../models/user";

export const registerUser = async (req:Request,res:Response) => {
    try{
        const {userName,userID} = req.body;

        const existingUser = await User.findOne({userID});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'UserID already exists'
            });
        }

        const newUser = await User.create({
            userName,
            userID
        });

        res.status(201).json({
            success: true,
            data: newUser
        });
    }catch(error){
        console.error('Registration error:',error);
        res.status(500).json({
            success: false,
            message: 'Error registering user'
        });
    }
}

export const loginUser = async (req: Request,res: Response) => {
    try{
        const { userName,userID } = req.body;

        if(!userName || !userID){
            return res.status(400).json({
                success: false,
                message: 'Please provide both userName and userID'
            });
        }

        const user = await User.findOne({userName,userID});

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid userName or userID'
            });
        }

        res.status(200).json({
            success: true,
            data:{
                userName:user.userName,
                userID:user.userID,
                _id:user._id
            }
        });
    }catch(error){
        console.error('Login error',error);
        res.status(500).json({
            success: false,
            message: 'Error during login'
        });
    }
}