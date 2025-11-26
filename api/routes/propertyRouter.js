const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const validate = require("../middleware/validate");
const {
  propertyCreation,
  propertyUpdate,
  ownPropertyCreation,
  ownPropertyUpdate,
} = require("../config/validationSchemas");
const {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  createOwnProperty,
  updateOwnProperty,
  deleteOwnProperty,
} = require("../controllers/propertyController");

module.exports = function ({ User, Property, Image }) {
  const router = express.Router();

  router.post(
    "/create",
    authentication,
    RBAC(["create_property"]),
    validate(propertyCreation),
    createProperty({ User, Property })
  );

  router.post(
    "/profile",
    authentication,
    RBAC(["create_own_property"]),
    validate(ownPropertyCreation),
    createOwnProperty({ User, Property })
  );

  router.put(
    "/profile/:id",
    authentication,
    RBAC(["update_own_property"]),
    validate(ownPropertyUpdate),
    updateOwnProperty({ User, Property })
  );

  router.delete(
    "/profile/:id",
    authentication,
    RBAC(["delete_own_property"]),
    deleteOwnProperty({ User, Property })
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
    updateProperty({ User, Property })
  );

  router.delete(
    "/:id",
    authentication,
    RBAC(["delete_property"]),
    deleteProperty(Property)
  );

  return router;
};
