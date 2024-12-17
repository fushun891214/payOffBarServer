import { Request,Response } from "express";
import Group from "../models/group";
import GroupMember from "../models/groupMember";
import User from "../models/user";

export const createGroup = async (req:Request,res:Response) => {
    try{
        const {groupName,ownerID,members} = req.body;

        const owner = await User.findOne({userID:ownerID});

        if(!owner){
            return res.status(404).json({
                success:false,
                message:'Owner not found'
            });
        }

        const groupID = `group_${Date.now()}`;

        const newGroup = await Group.create({
            groupID,
            groupName,
            ownerID,
            status:'active'
        });

        await GroupMember.create({
            groupID,
            userID:ownerID
        });

        if(members && Array.isArray(members)){
            for(const memberID of members){
                const member = await User.findOne({userID:memberID});
                if(member){
                    await GroupMember.create({
                        groupID,
                        userID:memberID
                    });
                }
            }
        }

        return res.status(201).json({
            success:true,
            data:{
                groupID:newGroup.groupID,
                groupName:newGroup.groupName,
                ownerID:newGroup.ownerID,
                status:newGroup.status,
                createdAt:newGroup.createdAt
            }
        });
        
    }catch(error){
        console.error('Create group error');
        return res.status(500).json({
            success:false,
            message:'Error creating group'
        });
    }
}