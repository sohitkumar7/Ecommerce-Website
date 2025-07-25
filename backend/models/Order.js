import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    userId:String,
    cartItems:[
        {
            productId:String,
            title:String,
            image:String,
            price:String,
            quantity:Number
        }
    ],
    addressInfo:{
        addressId:String,
        address:String,
        city:String,
        pincode:String,
        notes:String,
    },
    orderStatus: String,
    paymentMethod:String,
    paymentStatus:String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId:String,
    payerId:String    
})


const Orders = mongoose.model("orders",OrderSchema)
export default Orders;