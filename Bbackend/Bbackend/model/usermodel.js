import mongoose from "mongoose";
const userSchema= mongoose.Schema(
    {
        role:{
            type:Number,
            enum:[0,1]
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        mobile:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        otp:{
            type:Number
        },
        verified:{
            type:Boolean,
            default:false
        }
})

const userdata = mongoose.model("admin", userSchema)
export default userdata;