import express,{Request,Response} from "express";
import { createGroup } from "../controllers/groupController";

const router = express.Router();

router.post('/create',async (req:Request,res:Response) =>{
    await createGroup(req,res);
});

export default router;