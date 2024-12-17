import express, { NextFunction, Request,Response} from 'express';
import { auth } from '../middleware/auth';
import { addFriend, getFriendshipList } from '../controllers/friendController';

const router = express.Router();

router.post('/add',async (req: Request, res: Response):Promise<void> => {
    await addFriend(req, res);
});

router.post('/friendshipList',async (req:Request,res:Response):Promise<void> => {
    await getFriendshipList(req,res);
});

export default router;