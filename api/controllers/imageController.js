const { error } = require("../helper");

module.exports = function createImage({ Image, Property }) {
  return async (req, res, next) => {
    try {
      const {
        files,
        body: { propertyId },
      } = req;

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

        if (propertyId) {
          // fetch property and associte it with this image;
          const property = await Property.findByPk(propertyId);
          if (property) {
            await image.setProperty(property);
          }
        }

        pathArr.push(process.env.HOST_URL + "/" + image.path);
      }

      res.status(201).json({ success: true, images: pathArr });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };
};
