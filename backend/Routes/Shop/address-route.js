import express from "express";
import {EditAddress,fetchAllAdress,addAddress,DeleteAddress} from "../../controllers/shop/Address-controller.js"

const router = express.Router();

router.post('/add',addAddress)
router.get('/get/:userId',fetchAllAdress)
router.put('/update/:userId/:addressId',EditAddress)
router.delete('/delete/:userId/:addressId',DeleteAddress)

export default router;