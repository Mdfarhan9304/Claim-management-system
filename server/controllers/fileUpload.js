const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.originalname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images and PDF files are allowed!"));
    }
  },
});

module.exports = upload;
