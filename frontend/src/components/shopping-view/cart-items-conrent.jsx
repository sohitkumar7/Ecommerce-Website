import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  delterCartItem,
  UpdateCartQuantity,
} from "../../store/shop/cart-slice";
import toast from "react-hot-toast";

function UserCartItemsContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems: cartItemsFromStore } = useSelector(
    (state) => state.shopCart
  );
  const { productList } = useSelector((state) => state.shopProducts);
  function handleCartItemsDelete(cartItems) {
    const userId = user?._id;
    const productId = cartItems.productId;
    dispatch(delterCartItem({ userId, productId })).then((data) => {
      if (data?.payload.success) {
        toast.success("Cart Item is Deleted Successfully ");
      }
    });
  }

  function handleUpdateQuantity(getcartItems, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItemsFromStore.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItems = getCartItems.findIndex(
          (item) => item.productId === getcartItems.productId
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getcartItems.productId
        );

        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItems > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItems].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(
              `only ${getQuantity} quantity can be added for this item`
            );
            return;
          }
        }
      }
    }

    dispatch(
      UpdateCartQuantity({
        userId: user?._id,
        productId: getcartItems.productId,
        quantity:
          typeOfAction === "plus"
            ? getcartItems.quantity + 1
            : getcartItems.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload.success) {
        toast.success("Cart Item is Updated Successfully ");
      }
    });
  }

  return (
    <div className=" flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3>{cartItems?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            disabled={cartItems?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>

          <span className="font-semibold">{cartItems?.quantity}</span>

          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            ₹
            {(
              (cartItems?.salePrice > 0
                ? cartItems?.salePrice
                : cartItems?.price) * cartItems?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCartItemsDelete(cartItems)}
            className="cursor-pointer mt-1 "
            size={20}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
