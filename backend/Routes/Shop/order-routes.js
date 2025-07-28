import express from "express";
import  {CreateOrder,capturePayment, getAllOrdersByUser, getOrderDetails} from "../../controllers/shop/order-controller.js"

const router = express.Router();

router.post('/create',CreateOrder);
router.post('/capture',capturePayment);
router.get('/list/:userId',getAllOrdersByUser);
router.get('/details/:id',getOrderDetails);

export default router;