import express from "express"
import { SearchProduct } from "../../controllers/shop/search-controller";

const router = express.Router();
router.get("/:keyword",SearchProduct)
export default router;