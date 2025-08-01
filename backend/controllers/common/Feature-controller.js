import feature from "../../models/feature.js";

export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featueImages = new feature({
      image,
    });

    await featueImages.save();
    res.status(201).json({
      success: true,
      data: featueImages,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

export const getFeatureImage = async (req, res) => {
  try {
    const images = await feature.find({});

    res.status(201).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      succcess: false,
      message: error.message || error,
    });
  }
};
