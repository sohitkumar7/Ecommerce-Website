import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ handleDelete,product ,setopenCreateProductDialog,setcurrentEditedId,setFormData}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative ">
        <img
          className="w-full h-[300px] object-cover rounded-t-lg"
          src={product.image}
          alt={product.title}
        />
      </div>
      <CardContent>
        <h2 className=" mt-2 text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            }text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-ld font-bold">${product?.salePrice}</span>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <button onClick={()=>{
          setopenCreateProductDialog(true);
          setcurrentEditedId(product?._id)
          setFormData(product)
        }}>Edit</button>
        
        <button onClick={()=>handleDelete(product?._id)}>Delete</button>
      
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
