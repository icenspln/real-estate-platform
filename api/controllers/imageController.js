const { error } = require("../helper");

module.exports = function uploadImage(Image) {
  return async (req, res, next) => {
    try {
      const { files } = req;

      let pathArr = [];

      for (let i = 0; i < files.length; i++) {
        const {
          originalname,
          encoding,
          mimetype,
          destination,
          filename,
          path,
          size,
        } = files[i];

        const image = await Image.create({
          fileName: filename,
          originalName: originalname,
          mimeType: mimetype,
          encoding,
          destination,
          path,
          size,
        });
        pathArr.push(process.env.HOST_URL + "/" + image.path);
      }

      res.status(201).json({ success: true, images: pathArr });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };
};
