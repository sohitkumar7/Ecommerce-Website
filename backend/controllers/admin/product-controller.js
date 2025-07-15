import { imageUploadUtil } from "../../helpers/cloundanry.js";
import Product from "../../models/Product.js";

export const handleimageUpload = async (req, res) => {
  try {
    const b64 = Buffer(req.file.buffer).toString("base64");
    // const url = "data" + req.file.mimetype + ";base64," + b64;
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    // const errorr = error
    res.json({
      success: false,
      message: "Error Occured",
      error: error.message,
    });
  }
};
// add product controller
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
       image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock, 
    })

    await newlyCreatedProduct.save();
    res.status(201).json({
        success:true,
        data: newlyCreatedProduct
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// fetch all product controller
export const fetchAllProducts = async (req, res) => {
  try {

    const listofProducts = await Product.find({});
    res.status(200).json({
        success:true,
        data:listofProducts
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// edit a product controller
export const editProduct = async (req, res) => {
  try {

    const {id} = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if(!findProduct){
        return res.status(404).json({
            success:false,
            mmessage:"Product Not Fond"
        })
    }

    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price === '' ? 0 : price|| findProduct.price
    findProduct.salePrice = salePrice === '' ? 0 :salePrice|| findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock
    findProduct.image = image || findProduct.image

    await findProduct.save();
    res.status(200).json({
        success:true,
        data:findProduct
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// delete a product constroller
export const deleteProduct = async (req, res) => {
  try {

    const {id} = req.params;

    const finfProduct = await Product.findByIdAndDelete(id);
    if(!finfProduct){
        return res.status(404).json({
            success:false,
            message: "Product not Found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
