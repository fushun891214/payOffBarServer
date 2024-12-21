import { Request,Response } from "express";
import Group from "../models/group";
import GroupMember from "../models/groupMember";
import User from "../models/user";
import { IMemberInput } from "../models/interfaces";

export const createGroup = async (req:Request,res:Response) => {
    try{
        const {groupName,creatorID,members} = req.body;

        const creator = await User.findOne({userID:creatorID});

        if(!creator){
            return res.status(404).json({
                success: false,
                message: 'Creator not found'
            });
        }

        const groupID = `group_${Date.now()}`;

        const newGroup = await Group.create({
            groupID,
            groupName,
            creatorID
        });

        const groupMembers = await Promise.all(
            members.map(async (member: IMemberInput) => {
                return await GroupMember.create({
                    groupID: groupID,
                    userID: member.userID,
                    amount: member.amount,
                    payStatus: false
                });
            })
        );
    
        return res.status(201).json({
            success: true,
            data: {
                groupID: newGroup.groupID,
                groupName: newGroup.groupName,
                creatorID: newGroup.creatorID,
                members: groupMembers.map(member => ({
                    userID: member.userID,
                    amount: member.amount,
                    payStatus: member.payStatus
                })),
                createdAt: newGroup.createdAt
            }
        })
        
    }catch(error){
        console.error('Create group error',error);
        return res.status(500).json({
            success:false,
            message:'Error creating group'
        });
    }
}