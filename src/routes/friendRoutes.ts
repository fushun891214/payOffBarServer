import express, { NextFunction, Request,Response} from 'express';
import { auth } from '../middleware/auth';
import { addFriend, getFriendshipList } from '../controllers/friendController';

const router = express.Router();

router.post('/add',async (req: Request, res: Response):Promise<void> => {
    try {
        await addFriend(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing friend request'
        });
    }
});

router.post('/friendshipList',async (req:Request,res:Response):Promise<void> => {
    try{
        await getFriendshipList(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            message: 'Error processing friendshipList request'
        });
    }
});

export default router;