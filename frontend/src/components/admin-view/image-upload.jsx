import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import api from "@api";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setuploadedImageUrl,
  imageloadingstate,
  setimageloadingstate,
  isEditMode,
  iscustomStyling = false
}) {
  const inputRef = useRef(null);
  function handleimagefilechange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveimage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  console.log(imageFile);

  async function uploadimagetocloudnary() {
    try {
      setimageloadingstate(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await api.post(
        "/api/admin/products/upload-image",
        data
      );
      console.log("response", response);
      if (response?.data?.success) {
        setuploadedImageUrl(response.data.result.url);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setimageloadingstate(false);
    }
  }

  useEffect(() => {
    if (imageFile != null) uploadimagetocloudnary();
  }, [imageFile]);

  return (
    <>
      <div className={`w-full max-w-md mx-auto ${iscustomStyling ? '' : "max-w-md mx-auto"  }`}>
        <Label className="text-lg font-semibold mb-2 block">
          Upload Image
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={` ${
              isEditMode ? "opacity-60" : null
            }border-2 border-dashed rounded-lg p-4  mt-4`}
          >
            <Input
              ref={inputRef}
              onChange={handleimagefilechange}
              id="image-upload"
              type="file"
              className="hidden"
              disabled={isEditMode}
            />
            {!imageFile ? (
              <Label
                htmlFor="image-upload"
                className={` ${
                  isEditMode ? "cursor-not-allowed" : ""
                }  flex flex-col items-center justify-center h-32 cursor-pointer`}
              >
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"></UploadCloudIcon>
                <span className="text-black">
                  Drang & Drop or Click to upload image
                </span>
              </Label>
            ) : (
              // imageloadingstate?
              // <Skeleton classname="h-10 bg-grey-100"/>:

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 h-8 text-primary mr-2 " />
                </div>
                <p className="text-sm font-medium">{imageFile.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground "
                  onClick={handleRemoveimage}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only"></span>
                </Button>
              </div>
            )}
          </div>
        </Label>
      </div>
    </>
  );
}

export default ProductImageUpload;
