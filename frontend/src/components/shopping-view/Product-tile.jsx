import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "../../config";
import {Button} from "../ui/button"

function ShoppingProductTile({handleAddToCart, product,handleGetProductDetails }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={()=> handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full  h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {" "}
              Sale{" "}
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 ">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-large font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-large font-semibold text-primary ">
               ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
        <CardFooter>
          <Button onClick={() => handleAddToCart(product?._id)} className=" w-full">
            Add to Cart  
          </Button>
        </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
