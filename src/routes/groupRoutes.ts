import express,{Request,Response} from "express";
import { createGroup, editGroup } from "../controllers/groupController";

const router = express.Router();

router.post('/create',async (req:Request,res:Response) =>{
    await createGroup(req,res);
});

router.post('/edit',async (req:Request,res:Response) =>{
    await editGroup(req,res);
});

export default router;