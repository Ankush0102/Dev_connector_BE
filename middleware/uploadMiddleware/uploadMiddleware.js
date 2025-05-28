const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "devConnector/posts",
    allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "avi"],
    resource_type: "auto",
  },
});

const upload = multer({ storage });

exports.uploadMultiple = upload.array("media", 5);
