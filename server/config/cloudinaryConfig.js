import { config as dotenvConfig } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenvConfig();

// Import Cloudinary credentials from .env
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});


const uploadToCloudinary = async (fileBuffer, imageType) => {
  try {
    // Validate imageType to ensure it's a string and not empty
    if (!imageType || typeof imageType !== 'string') {
      throw new Error('imageType must be a non-empty string');
    }

    // Define the root folder and construct the full folder path
    const rootFolder = 'Hare Krishna Vidya';
    const folderPath = `${rootFolder}/${imageType}`; // e.g., x/blog-cover, x/grocery

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: folderPath, resource_type: 'image' },
        (error, result) => {
          if (error) return reject(new Error(error.message));
          resolve(result);
        }
      ).end(fileBuffer);
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('imageUrl must be a non-empty string');
    }

    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');

    // Find index of "upload" to locate the path after it
    const uploadIndex = pathParts.indexOf('upload');
    if (uploadIndex === -1 || uploadIndex + 2 >= pathParts.length) {
      throw new Error('Invalid Cloudinary URL structure');
    }

    // Skip: '', 'v<digits>' (version)
    const publicIdParts = pathParts.slice(uploadIndex + 2);
    const lastPart = publicIdParts[publicIdParts.length - 1];
    const fileNameWithoutExt = lastPart.substring(0, lastPart.lastIndexOf('.'));
    publicIdParts[publicIdParts.length - 1] = fileNameWithoutExt;

    const publicId = decodeURIComponent(publicIdParts.join('/'));

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    if (result.result !== 'ok') {
      throw new Error(`Cloudinary deletion failed: ${result.result}`);
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to delete image from Cloudinary: ${error.message}`);
  }
};


export { cloudinary, uploadToCloudinary, deleteFromCloudinary };