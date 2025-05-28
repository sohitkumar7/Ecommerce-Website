import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    },
},{timestamps:true})

const user = mongoose.model('user',UserSchema)
export default user;