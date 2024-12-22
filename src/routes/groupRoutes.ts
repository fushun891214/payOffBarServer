import express,{Request,Response} from "express";
import { createGroup, editGroup,getUserGroup } from "../controllers/groupController";

const router = express.Router();

router.post('/create',async (req:Request,res:Response) =>{
    await createGroup(req,res);
});

router.post('/edit',async (req:Request,res:Response) =>{
    await editGroup(req,res);
});

router.get('/getUserGroup/:userID',async (req:Request,res:Response) =>{
    await getUserGroup(req,res);
});

export default router;