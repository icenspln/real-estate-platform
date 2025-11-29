const { error } = require("../utils/helper");

const createProperty =
  ({ Property, User }) =>
  async (req, res, next) => {
    try {
      const { userId } = req.body;
      const property = await Property.create(req.body);
      if (userId) {
        const user = await User.findByPk(userId);
        await property.setUser(user);
      }
      res.status(201).json({ success: true, message: "Property created" });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };

const getAllProperties =
  ({ Property }) =>
  async (req, res, next) => {
    try {
      const properties = await Property.findAll();
      res.status(200).json({ success: true, properties });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };

const getProperty = (Property) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    res.status(200).json({ success: true, property });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const updateProperty =
  ({ Property, User }) =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const property = await Property.findByPk(id);
      if (!property) {
        return res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }
      property.set(req.body);

      if (userId) {
        const user = await User.findByPk(userId);
        await property.setUser(user);
      }
      await property.save();
      res.status(200).json({ success: true, property });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };

const deleteProperty = (Property) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    await property.destroy();
    res.status(200).json({ success: true, property });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const createOwnProperty =
  ({ User, Property }) =>
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const property = await Property.create(req.body);
      const user = await User.findByPk(userId);
      await property.setUser(user);
      res.status(201).json({ success: true, message: "Property Created" });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };

const updateOwnProperty =
  ({ _User, Property }) =>
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;

      // const user = await User.findByPk(userId);
      const property = await Property.findByPk(id);
      if (!property) {
        return res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }

      // check user owns property
      if (property.UserId != userId) {
        // doens't own it
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      // update property
      property.set(req.body);
      await property.save();
      res.status(200).json({ success: true, message: "Property updated" });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };

const deleteOwnProperty =
  ({ _User, Property }) =>
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;

      const property = await Property.findByPk(id);
      if (!property) {
        return res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }

      // check user owns property
      if (property.UserId != userId) {
        // doens't own it
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      // update property
      await property.destroy();
      res.status(200).json({ success: true, message: "Property deleted" });
    } catch (err) {
      error(err.message);
      next(err);
    }
  };

module.exports = {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  createOwnProperty,
  updateOwnProperty,
  deleteOwnProperty,
};
