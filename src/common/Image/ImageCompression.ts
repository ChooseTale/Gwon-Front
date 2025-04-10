import imageCompression from "browser-image-compression";

export const compressImage = async (image: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(image, options);
    return compressedFile;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default compressImage;
