import toast from "react-hot-toast";
import DashboardProductImageUpload from "../../components/admin-view/dashboardimageupload";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { Button } from "../../components/ui/button";
import { addFeatureImage, getFeatureImages } from "../../store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast.success("Feature Image Uploaded Successfully");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
    setImageFile(null);
    setUploadedImageUrl("")
  }, [dispatch]);

  return (
    <div>
      <DashboardProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
      />
      <Button
        onClick={handleUploadFeatureImage}
        disabled={imageLoadingState || uploadedImageUrl === ""}
        className="mt-5 w-full"
      >
        {imageLoadingState ? "Uploading..." : "Upload"}
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem._id}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;

