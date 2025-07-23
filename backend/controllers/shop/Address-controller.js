import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    console.log()

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data",
      });
    }

    const newlyCreatedAdress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAdress.save();
    res.status(200).json({
        success:true,
        data: newlyCreatedAdress
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const fetchAllAdress = async (req, res) => {
  try {

    const {userId} = req.params;

    if(!userId){
        return res.status(500).json({
            success:false,
            message:"UserId is Invalid"
        })
    }

    const addressList = await Address.find({userId})

    res.status(200).json({
        success:true,
        data: addressList
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const EditAddress = async (req, res) => {
  try {

    const {userId,addressId} = req.params;
    const {formData} = req.body;

    if(!userId || addressId){
        return res.status(400).json({
            success:false,
            message:"Invalid Data Provided"
        })
    }

    const address = await Address.findOneAndUpdate({
        _id : addressId,userId
    },formData,{new:true})

    if(!address){
        return res.status(500).json({
            success:false,
            message:"Address Cannot beFound"
        })
    }

    res.status(200).json({
        success:true,
        data:address
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const DeleteAddress = async (req, res) => {
  try {
    
    const {userId,addressId} = req.params;
     if(!userId || addressId){
        return res.status(400).json({
            success:false,
            message:"Invalid Data Provided"
        })
    }

    const address = await Address.findOneAndDelete({
        _id:addressId,userId
    })

    if(!address){
        return res.status(500).json({
            success:false,
            message:"Address not Found"
        })
    }

    res.status(200).json({
        success:true,
        message: "Address Delelted Successfull"
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
