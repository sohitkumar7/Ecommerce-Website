import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
 userId : String,
 address: String,
 city : String,
 pincode : String,
 phone:String,
 notes:String   
},{timestamps:true})

const address = mongoose.model("Address",AddressSchema)
export default address