import React from "react";
import { Card, CardContent } from "../ui/card";
import {Badge} from "../ui/badge"

function ShoppingProductTile({ product }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full  h-[300px] object-cover rounded-t-lg"
          />
          {
            product?.salePrice > 0 ?
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">  Sale </Badge> : null
          }
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 ">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{product?.category}</span>
            <span className="text-sm text-muted-foreground">{product?.brand}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className={`${product?.salePrice > 0 ? "line-through":""} text-large font-semibold text-primary`}>{product?.price}</span>
            {
              
            }
            <span className="text-sm text-muted-foreground">{product?.salePrice}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
