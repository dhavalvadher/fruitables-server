const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = async (localPath, folderName) => {

    try {
        const uploadResult = await cloudinary.uploader.upload(localPath, {
            folder: folderName
        }).catch((error) => { console.log(error) });

        return uploadResult
    } catch (error) {
        console.log(error);
    }
  

}

module.exports = uploadFile