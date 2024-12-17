import { Request, Response } from "express";
import User from "../models/user";
import Friend from "../models/friend";

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { userName, userID } = req.body;
        console.log('Request body:', req.body);
        console.log('Current user:', req.user);

        // 查找要加為好友的用戶
        const friendUser = await User.findOne({ userName, userID });
        if (!friendUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // 從 auth 中間件獲取當前用戶信息
        const currentUser = req.user;
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        // 檢查是否嘗試加自己為好友
        if (currentUser.userID === userID) {
            return res.status(400).json({
                success: false,
                message: 'Cannot add yourself as friend'
            });
        }

        // 檢查是否已經是好友
        const existingFriendship = await Friend.findOne({
            $or: [
                { userID: currentUser.userID, friendID: userID },
                { userID: userID, friendID: currentUser.userID }
            ]
        });

        if (existingFriendship) {
            return res.status(400).json({
                success: false,
                message: 'Friend request already exists or users are already friends'
            });
        }

        // 打印詳細信息
        console.log('Creating friendship with:', {
            userID: currentUser.userID,
            friendID: userID,
            userName: currentUser.userName,
            friendName: userName
        });

        // 創建新的好友關係
        const newFriendship = await Friend.create({
            userID: currentUser.userID,
            friendID: userID,
            userName: currentUser.userName,
            friendName: userName,
            status: 'pending'
        });

        return res.status(201).json({
            success: true,
            data: {
                friendshipId: newFriendship._id,
                userID: newFriendship.userID,
                friendID: newFriendship.friendID,
                userName: newFriendship.userName,
                friendName: newFriendship.friendName,
                status: newFriendship.status,
                createdAt: newFriendship.createdAt
            }
        });
    } catch (error) {
        console.error('Add friend error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error adding friend',
        });
    }
};