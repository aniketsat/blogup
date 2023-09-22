// middleware to upload avatar to cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure multer-storage-cloudinary
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
  },
});

const coverStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "covers",
  },
});

// configure multer
const uploadAvatar = multer({ storage: avatarStorage });

const uploadCover = multer({ storage: coverStorage });

module.exports = { uploadAvatar, uploadCover };
