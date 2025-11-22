const { error } = require("../helper");

const createProperty = (Property) => async (req, res, next) => {
  try {
    await Property.create(req.body);
    res.status(201).json({ success: true, message: "Property created" });
  } catch (err) {
    error(err.message);
    next(err);
  }
};
const getAllProperties = (Property) => async (req, res, next) => {
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
const updateProperty = (Property) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    property.set(req.body);
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

module.exports = {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
};
