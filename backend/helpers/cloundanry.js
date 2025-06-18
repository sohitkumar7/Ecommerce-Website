import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";

cloudinary.config({
    clod_name:"djxzbsfmg",
    api_key:"752911873929776",
    api_secret:"ZXbrBCT7YpBPVaVNIMRcRNeXUbg"
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    })

    return result;
}

const upload = multer({storage})

export  {upload,imageUploadUtil}

