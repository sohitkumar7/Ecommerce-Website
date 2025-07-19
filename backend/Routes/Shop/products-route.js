import express from "express";
import { getFilterProduct, getProductDetail } from "../../controllers/shop/ProductsController.js";

import { upload } from "../../helpers/cloundanry.js";

const router = express.Router();
router.get('/get',getFilterProduct  )
router.get('/get/:id',getProductDetail);

export default router;
