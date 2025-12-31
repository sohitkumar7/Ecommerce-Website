import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import api from "@api";

function DashboardProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode = false,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
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

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await api.post("/api/admin/products/upload-image", data);
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile != null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">
        Upload Image
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-4 mt-4 ${isEditMode ? "opacity-60" : ""}`}
        >
          <Input
            ref={inputRef}
            onChange={handleImageFileChange}
            id="image-upload"
            type="file"
            className="hidden"
            disabled={isEditMode}
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
                isEditMode ? "cursor-not-allowed" : ""
              }`}
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span className="text-black">Drag & Drop or Click to upload image</span>
            </Label>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 h-8 text-primary mr-2" />
                <p className="text-sm font-medium">{imageFile.name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Label>
    </div>
  );
}

export default DashboardProductImageUpload;