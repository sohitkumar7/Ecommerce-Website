import { DialogContent, Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AvatarFallback, Avatar } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import toast from "react-hot-toast";
import { setProductDetails } from "../../store/shop/product-slice";
import StarRatingComponent from "../commmon/star.rating";
import { addReview, getReviews } from "../../store/shop/Review-slice";

function productDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  console.log(user, "productDetails");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getToatalStock) {
    console.log(getCurrentProductId);
    const userId = user?._id;
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

  function handleDialogeClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  const formData = {
    productId: productDetails?._id,
    userId: user?._id,
    userName: user?.userName,
    reviewMessage: reviewMsg,
    reviewValue: rating,
  };
  function handleAddReview() {
    dispatch(addReview(formData)).then((data) => {
      console.log(data);
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        let id = productDetails?._id;
        dispatch(getReviews(id));
        toast.success("Review Added Successfully");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview = reviews && reviews.length > 0 ?
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
    reviews.length : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogeClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            weight={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating = {averageReview}/>
            </div>
            <span className="text-muted-foreground">{averageReview.toFixed(1)}</span>
          </div>

          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full  opacity-65 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  );
                }}
                className="w-full"
              >
                ADD to Cart
              </Button>
            )}
          </div>
          <Separator></Separator>
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Revies</h2>

            <div className="grid gap-6  ">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>

            <div className="mt-10 flex  flex-col gap-2">
              <label>Write a Review</label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="review Message"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review ..."
              ></Input>
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default productDetailsDialog;
