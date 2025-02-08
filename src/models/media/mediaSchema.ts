import mongoose from "mongoose"

const mediaSchema=new mongoose.Schema({
    url:{
        required:true,
        type:String
    },
    type:{
        required:true,
        type:String,
        
    },
    description:{
        required:true,
        type:String
    },
   
    isDeleted:{
        type:Boolean,
        default:false
    },
    
},
{
    timestamps: true,
  }
)
const  Media=mongoose.model('Media',mediaSchema)
export default Media;