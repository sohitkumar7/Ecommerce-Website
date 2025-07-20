import  express from"express"
import { addToCart, deleteCartItems, fetchCartItems, UpdateCartitemsQuantity } from "../../controllers/shop/Cart-controller.js"

const router = express.Router()

router.post('/add',addToCart) 
router.get('/get/:userId',fetchCartItems) 
router.put('/update-cart',UpdateCartitemsQuantity)
router.delete('/:userId/:productId',deleteCartItems)

export default router;
