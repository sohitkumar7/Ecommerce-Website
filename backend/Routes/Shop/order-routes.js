import express from "express";
import  {CreateOrder,capturePayment} from "../../controllers/shop/order-controller.js"

const router = express.Router();

router.post('/create',CreateOrder);
router.post('/capture',capturePayment);

export default router;