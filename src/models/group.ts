import mongoose,{Document,Schema} from "mongoose";

interface IGroup extends Document{
    groupID:String,
    groupName:String,
    ownerID:String,
    status:String,
    createdAt:Date,
    updatedAt:Date
}

const groupSchema = new Schema <IGroup> ({
    groupID:{
        type:String,
        required:true,
        unique:true
    },
    groupName:{
        type:String,
        required:true
    },
    ownerID:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive','archived'],
        default:'active'
    }
},{
    timestamps:true
});

export default mongoose.model<IGroup>('Group',groupSchema);