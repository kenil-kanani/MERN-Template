import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPhotoOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log('Uploading Image...');

        //Uploading File to Cloudinary
        const cldnry_res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: 'queryquest/photos',
        });

        // File Uploaded Successfully & Removing File From Local System
        fs.unlinkSync(localFilePath);
        return cldnry_res;
    } catch (error) {
        fs.unlinkSync(localFilePath); //Removing File From Local System
        console.log('CLOUDINARY :: FILE UPLOAD ERROR ', error.message);
        return null;
    }
};

const deleteImageOnCloudinary = async (URL) => {
    try {
        if (!URL) return false;

        const ImageId = URL.match(
            /(?:image|video)\/upload\/v\d+\/queryquest\/(photos|videos)\/(.+?)\.\w+$/
        )[2];

        console.log('Deleting Image from Cloudinary...');

        const cldnry_res = await cloudinary.uploader.destroy(
            `queryquest/photos/${ImageId}`,
            {
                resource_type: 'image',
            }
        );

        return cldnry_res;
    } catch (error) {
        console.log('CLOUDINARY :: FILE Delete ERROR ', error.message);
        return false;
    }
};

const cloudinaryService = {
    uploadPhotoOnCloudinary,
    deleteImageOnCloudinary,
};

export default cloudinaryService;
