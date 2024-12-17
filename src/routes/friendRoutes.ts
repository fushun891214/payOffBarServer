import express, { NextFunction, Request,Response} from 'express';
import { auth } from '../middleware/auth';
import { addFriend } from '../controllers/friendController';

const router = express.Router();

router.post('/add', auth, async (req: Request, res: Response):Promise<void> => {
    try {
        await addFriend(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing friend request'
        });
    }
});

export default router;