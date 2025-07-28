import Orders from "../../models/Order.js";
import Cart from "../../models/cart.js";

export const getAllOrdersofAllUser = async (req, res) => {
  try {

    const orders = await Orders.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getOrderDetailsforAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


export const updateOrderStatus = async(req,res) => {
  try {
    
    const {id} = req.params;
    const {orderStatus} =  req.body;

    const order = await Orders.findById(id);

    if(!order){
      return res.status(404).json({
        success:false,
        message:("order not found")
      })
    }

    await Orders.findByIdAndUpdate(id,{orderStatus})

    res.status(200).json({
      success:true,
      message:"order status is updated Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(404).json({
      success:false,
      message:"Something went wrong"
    })
  }
}