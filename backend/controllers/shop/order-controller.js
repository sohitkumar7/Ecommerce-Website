import paypal from "../../helpers/payapal.js";
import Orders from "../../models/Order.js";
import Cart from "../../models/cart.js";
import Product from "../../models/Product.js"
export const CreateOrder = async (req, res) => {
  try {
    const {
      cartId,
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      payerId,
      paymentId,
    } = req.body;

    const create_Payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Order payment",
        },
      ],
    };

    paypal.payment.create(create_Payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal Error:", error);
        return res.status(500).json({
          success: false,
          message: "Error creating PayPal payment",
        });
      }

      try {
        const newlyCreatedOrder = new Orders({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          payerId,
          paymentId,
          cartId,
        });

        await newlyCreatedOrder.save();

        const approvalUrl = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        )?.href;

        if (!approvalUrl) {
          return res.status(500).json({
            success: false,
            message: "Approval URL not found in PayPal response",
          });
        }

        return res.status(201).json({
          success: true,
          approvalUrl,
          orderId: newlyCreatedOrder._id,
        });
      } catch (saveError) {
        console.error("Error saving order:", saveError);
        return res.status(500).json({
          success: false,
          message: "Error saving order to database",
          error: saveError.message,
        });
      }
    });
  } catch (error) {
    console.error("Outer error:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "order  is invalid",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.cartItems){
      let product = await Product.findById(item.productId)
    
      if(!product){
        return res.status(404).json({
          success:false,
          message: `not enough stock for this stock ${product.title}`
        })
      }

      product.totalStock -= item.quantity
      await product.save();

    }




    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "order Confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error Occured",
    });
  }
};

export const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Orders.find({ userId });

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

export const getOrderDetails = async (req, res) => {
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
