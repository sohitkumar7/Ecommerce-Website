import mongoose from"mongoose"

const FeatureSchema = new mongoose.Schema({
    image:String,
},{timestamps : true})

const feature = new mongoose.model("features",FeatureSchema)
export default feature;