const multer = require("multer");

module.exports = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "static/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      // checking image mimetype
      const mime = file.mimetype.split("/");
      const mimeSubtypeArr = ["jpeg", "png", "svg+xml", "webp"];
      if (mime[0] !== "image" || !mimeSubtypeArr.includes(mime[1])) {
        return cb(new multer.MulterError("mimetype error"));
      }
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + mime[1]);
    },
  });
  const upload = multer({ storage }).array("photos");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong mimetype" });
    } else if (err) {
      return next(err);
    }
    next();
  });
};
