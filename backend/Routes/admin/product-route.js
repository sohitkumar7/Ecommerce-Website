import express from "express";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleimageUpload } from "../../controllers/admin/product-controller.js";

import { upload } from "../../helpers/cloundanry.js";

const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleimageUpload);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProducts)

export default router;
