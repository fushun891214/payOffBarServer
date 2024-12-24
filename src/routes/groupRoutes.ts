import express,{Request,Response} from "express";
import { createGroup, editGroup,getGroupDetail,getUserGroup, deleteGroup, notifyUnpaidMembers } from "../controllers/groupController";

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

router.get('/getGroupDetail/:groupID',async (req:Request,res:Response) =>{
    await getGroupDetail(req,res);
});

router.delete('/deleteGroup/:groupID',async (req:Request,res:Response) =>{
    await deleteGroup(req,res);
});

router.get('/notifyUnpaidMembers',async (req:Request,res:Response) =>{
    await notifyUnpaidMembers(req,res);
});

export default router;