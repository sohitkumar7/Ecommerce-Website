import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SheetHeader,
  Sheet,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";
import { addProductFormElements } from "../../config";
import CommonForm from "../../components/commmon/form";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useEffect } from "react";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
  deteleProduct
} from "../../store/admin/product-slice";
import toast from "react-hot-toast";
import AdminProductTile from "../../components/admin-view/product-tile";

function Adminproduct() {
  const [openCreateProductDialog, setopenCreateProductDialog] = useState(false);
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [formData, setFormdata] = useState(initialFormData);
  const [imageFile, setimageFile] = useState(null);
  const [uploadedImageUrl, setuploadedImageUrl] = useState("");
  const [imageloadingstate, setimageloadingstate] = useState(false);
  const [currentEdittedId, setcurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    currentEdittedId !== null
      ? dispatch(
          editProduct({
            id: currentEdittedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data.payload.success) {
            dispatch(fetchAllProducts());
            setFormdata(initialFormData);
            setopenCreateProductDialog(false);
            setcurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setopenCreateProductDialog(false);
            setimageFile(null);
            setFormdata(initialFormData);
            toast.success("Product added successfully");
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId);

    dispatch(deteleProduct(getCurrentProductId)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log("productlist",uploadedImageUrl,productList)
  console.log(uploadedImageUrl, "imageurl");
  return (
    <>
      <div className="w-full flex justify-end">
        <button
          onClick={() => setopenCreateProductDialog(true)}
          className=" font-medium shadow text-sm rounded-xl w-35 h-10 bg-black text-white"
        >
          Add New Product
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productList && productList.length > 0
          ? productList.map((productItems) => (
              <AdminProductTile
                setcurrentEditedId={setcurrentEditedId}
                setopenCreateProductDialog={setopenCreateProductDialog}
                product={productItems}
                setFormData={setFormdata}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setopenCreateProductDialog(false);
          setcurrentEditedId(null);
          setFormdata(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEdittedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setimageFile}
            uploadedImageUrl={uploadedImageUrl}
            setuploadedImageUrl={setuploadedImageUrl}
            imageloadingstate={imageloadingstate}
            setimageloadingstate={setimageloadingstate}
            isEditMode={currentEdittedId == !null}
          ></ProductImageUpload>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              buttonText={currentEdittedId !== null ? "Edit" : "Add"}
              formData={formData}
              setFormData={setFormdata}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Adminproduct;
