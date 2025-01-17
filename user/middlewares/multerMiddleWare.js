import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.originalname.split(' ').join('-') + "-" + Date.now() + "." + extension);
  },
});

const multerMiddleware = multer({ storage: storage });

export default multerMiddleware;