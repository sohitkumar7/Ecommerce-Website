import express from "express";
import { getAllOrdersofAllUser,updateOrderStatus, getOrderDetailsforAdmin } from "../../controllers/admin/order-controller.js";

const router = express.Router();

router.get('/get',getAllOrdersofAllUser);
router.get('/details/:id',getOrderDetailsforAdmin);
router.put('/update/:id',updateOrderStatus);

export default router;