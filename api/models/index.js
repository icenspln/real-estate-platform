const User = require("./User");
const Property = require("./Property");
const Image = require("./Image");
const RefreshToken = require("./RefreshToken");

// init data
module.exports = function initModels(sequelize) {
  const models = {
    RefreshToken: RefreshToken.initModel(sequelize),
    User: User.initModel(sequelize),
    Property: Property.initModel(sequelize),
    Image: Image.initModel(sequelize),
  };

  // associations
  models.User.hasOne(RefreshToken, {
    onDelete: "CASCADE",
  });
  RefreshToken.belongsTo(User);

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
