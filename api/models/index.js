const User = require("./User");
const Property = require("./Property");
const Image = require("./Image");

// init data
module.exports = function initModels(sequelize) {
  const models = {
    User: User.initModel(sequelize),
    Property: Property.initModel(sequelize),
    Image: Image.initModel(sequelize),
  };

  // associations
  models.User.hasMany(models.Property, {
    onDelete: "CASCADE",
  });
  models.Property.belongsTo(models.User);

  models.Property.hasMany(models.Image, {
    onDelete: "CASCADE",
  });
  models.Image.belongsTo(models.Property);

  return models;
};
