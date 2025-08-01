import express from "express";
import { addFeatureImage,getFeatureImage } from "../../controllers/common/Feature-controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);

export default router;