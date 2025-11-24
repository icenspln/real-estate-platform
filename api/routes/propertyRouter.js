const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const validate = require("../middleware/validate");
const {
  propertyCreation,
  propertyUpdate,
} = require("../config/validationSchemas");
const {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

module.exports = function ({ Property, Image }) {
  const router = express.Router();

  router.post(
    "/create",
    authentication,
    RBAC(["create_property"]),
    validate(propertyCreation),
    createProperty(Property)
  );
  router.get(
    "/",
    authentication,
    RBAC(["read_property"]),
    getAllProperties({ Property, Image })
  );
  router.get(
    "/:id",
    authentication,
    RBAC(["read_property"]),
    getProperty(Property)
  );
  router.put(
    "/:id",
    authentication,
    RBAC(["update_property"]),
    validate(propertyUpdate),
    updateProperty(Property)
  );
  router.delete(
    "/:id",
    authentication,
    RBAC(["delete_property"]),
    deleteProperty(Property)
  );
  return router;
};
