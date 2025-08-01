import ProductDetailsDialog from "../../components/shopping-view/productDetails";
import ShoppingProductTile from "../../components/shopping-view/Product-tile.jsx";
import { Input } from "../../components/ui/input";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { fetchProductDetails } from "../../store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "../../store/shop/search-slice/index.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetail } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleAddToCart(getCurrentProductId, getToatalStock) {
    const userId = user?._id;
    console.log(cartItems, "cartItems");
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItems = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItems > -1) {
        const getQuantity = getCartItems[indexOfCurrentItems].quantity;
        if (getQuantity + 1 > getToatalStock) {
          toast.error(
            `only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId }));
        toast.success("Product is Added to Cart");
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetail !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetail]);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  console.log(searchResults, "searchResults");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddToCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetail}
      />
    </div>
  );
}

export default SearchProducts;
