const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const upload = multer({ dest: "./images" });

cloudinary.config({
    cloud_name: "dslnuaqdh",
    api_key: "218387912829347",
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
    if (!req.file) {
        res.status(400).send("No image attached");
        return;
    } else {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
            if (error) {
                res.status(err).send(err.message);
                return;
            }
            if (result) {
                req.body.picture = result.secure_url;
                fs.unlinkSync(req.file.path);
                next();
            }
        });
    }
};

module.exports = { upload, uploadToCloudinary };
