// Cloud name = debpc3gkq
// API key = 835497778338143
// API secret = 5BEQaxa7kZuTOpHx_JuRhL-2iKs
// CLOUDINARY_URL=cloudinary://835497778338143:5BEQaxa7kZuTOpHx_JuRhL-2iKs@debpc3gkq
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{ resource_type: "auto" });
        // Remove the file from local uploads folder after successful upload
        console.log('Cloudinary upload response:', response);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadToCloudinary };