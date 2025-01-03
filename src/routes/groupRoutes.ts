import express,{Request,Response} from "express";
import { 
    createGroup, 
    editGroup,
    getGroupDetail,
    getUserGroup, 
    deleteGroup, 
    notifyUnpaidMembers, 
    notifyUpdatePaymentStatus 
} from "../controllers/groupController";

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

router.get('/notifyUnpaidMembers/:groupID',async (req:Request,res:Response) =>{
    await notifyUnpaidMembers(req,res);
});

router.get('/notifyUpdatePaymentStatus/:groupID/:userID/:status',async (req:Request,res:Response) => {
    await notifyUpdatePaymentStatus(req,res);
});

export default router;