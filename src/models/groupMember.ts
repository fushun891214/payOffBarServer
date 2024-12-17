import mongoose,{Document,Schema} from "mongoose";

interface IGroupMember extends Document{
    groupID:string,
    userID:string,
    createdAt: Date,
    updatedAt: Date
}

const groupMemberSchema = new Schema <IGroupMember> ({
    groupID:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

groupMemberSchema.index({groupID:1,userID:1},{unique:true});

export default mongoose.model<IGroupMember>('GroupMember',groupMemberSchema);