import axios from "axios";
import * as FileSystem from "expo-file-system";

const CLOUDINARY_UPLOAD_PRESET = "smart-minutes";
const CLOUDINARY_CLOUD_NAME = "drrh3span";

const uploadAudioToCloudinary = async (uri) => {
  try {
    // Convert file to base64
    const base64Audio = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Create FormData
    const formData = new FormData();
    formData.append("file", `data:audio/m4a;base64,${base64Audio}`);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // unsigned
    formData.append("resource_type", "auto"); // auto detects audio/video/image

    // Upload to Cloudinary
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, // "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload", --> sore CLOUD_NAME in .env
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const cloudinaryUrl = response.data.secure_url;
    return cloudinaryUrl;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    return null;
  }
};

export { uploadAudioToCloudinary };

