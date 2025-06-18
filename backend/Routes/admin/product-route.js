import express from "express";
import { handleimageUpload } from "../../controllers/admin/product-controller.js";

import { upload } from "../../helpers/cloundanry.js";

const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleimageUpload);


export default router;
