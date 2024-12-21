import mongoose,{Document,Schema} from "mongoose";

interface IGroupMember extends Document{
    groupID: string,
    userID: string,
    amount: number,
    payStatus: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface IMemberInput{
    userID: string,
    amount: number,
    payStatus: boolean
}

const groupMemberSchema = new Schema<IGroupMember>({
    groupID:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    payStatus:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

groupMemberSchema.index({ groupID:1, userID:1},{unique:true});

export default mongoose.model<IGroupMember>('GroupMember',groupMemberSchema);