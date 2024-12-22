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

export const getUserGroup = async (req:Request,res:Response) => {
    try{
        const {userID} = req.params;

        const groupAsMember = await GroupMember.find({userID});

        const groupAsCreator = await Group.find({creatorID: userID});

        const groupList = await Promise.all([
            ...await Promise.all(groupAsMember.map(async member => {
                const group = await Group.findOne({groupID: member.groupID});
                if(!group) return null;

                return{
                    groupID: group.groupID,
                    groupName: group.groupName,
                    role: 'payer',
                    status: member.payStatus ? 'paid' : 'unpaid'
                }
            })),

            ...await groupAsCreator.map(group => ({
                groupID: group.groupID,
                groupName: group.groupName,
                role: 'creator',
                status: 'creator'
            }))
        ]);

        const uniqueGroups = groupList.filter((group): group is NonNullable<typeof group> => 
            group !== null
        ).filter((group, index, self) => 
            index === self.findIndex(g => g.groupID === group.groupID)
        );

        return res.status(200).json({
            success: true,
            data: uniqueGroups
        });
    }
    catch(error){
        console.error('Get group error',error);
        return res.status(500).json({
            success:false,
            message:'Error editing group'
        });
    }
}

export const getGroupDetail = async (req:Request,res:Response) => {
    try{
        const {groupID} = req.params;

        const group = await Group.findOne({groupID});

        if(!group){
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        const groupMembers = await GroupMember.find({groupID});

        const groupDetail = ({
            groupID: group.groupID,
            groupName: group.groupName,
            creatorID: group.creatorID,
            members: groupMembers.map(member => ({
                userID: member.userID,
                amount: member.amount,
                payStatus: member.payStatus
            })),
        });

        return res.status(200).json({
            success: true,
            data: groupDetail
        });

    }catch(error){
        console.error('Get group detail error',error);
        return res.status(500).json({
            success:false,
            message:'Error getting group detail'
        });
    }
}