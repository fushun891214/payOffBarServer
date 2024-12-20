import { Request,Response } from "express";
import Group from "../models/group";
import GroupMember,{ IMemberInput}  from "../models/groupMember";
import User from "../models/user";

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
                    payStatus: member.payStatus = false
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

export const editGroup = async (req:Request,res:Response) => {
    try{
        const {groupID,members} = req.body;

        const group = await Group.findOne({groupID:groupID});

        if(!group){
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        const updatedMembers = await Promise.all(
            members.map(async (member:IMemberInput) => {
                const updatedMember = await GroupMember.findOneAndUpdate(
                    {groupID: groupID,userID: member.userID },
                    {payStatus: member.payStatus},
                    {new: true},
                );
                return updatedMember;
            })
        );

        return res.status(200).json({
            success: true,
            data:{
                groupID: group.groupID,
                groupName: group.groupName,
                creatorID: group.creatorID,
                members: updatedMembers.map(member => ({
                    userID: member?.userID,
                    amount: member?.amount,
                    payStatus: member?.payStatus
                })),
                updateAt: group.updatedAt
            }
        });

    }catch(error){
        console.error('Edit group error',error);
        return res.status(500).json({
            success:false,
            message:'Error editing group'
        });
    }
}