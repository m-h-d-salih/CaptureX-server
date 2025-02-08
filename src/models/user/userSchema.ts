import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        
    },
    password:{
        required:true,
        type:String
    },
media:[{
    type:mongoose.Schema.Types.ObjectId,
        ref:'Media'
}],
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true,
  }
)
const  User=mongoose.model('User',userSchema)
export default User;