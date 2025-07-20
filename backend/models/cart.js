import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true, 
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
},{timestamps:true  });


const Cart = mongoose.model("cart",CartSchema)
export default Cart