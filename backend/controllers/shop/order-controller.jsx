import paypal from "../../helpers/payapal.js";
import Orders from "../../models/Order.js";
export const CreateOrder = async (req, res) => {
  try {
    const {
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
      redirecct_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },

      Transaction: [
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
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_Payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: " ERROR in Paypal creating paypal payment",
        });
      } else {
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
        });
      }

      await newlyCreatedOrder.save();
      const approvalUrl = paymentInfo.links.find(link => link.rel === 'approval_url').href

      res.status(201).json({
        success:true,
        approvalUrl ,
        orderId : newlyCreatedOrder._id
      })

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error Occured",
    });
  }
};
export const capturePayment = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error Occured",
    });
  }
};
