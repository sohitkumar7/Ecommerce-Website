import express from "express";
import { getFilterProduct } from "../../controllers/shop/ProductsController.js";

import { upload } from "../../helpers/cloundanry.js";

const router = express.Router();
router.get('/get',getFilterProduct  )

export default router;
