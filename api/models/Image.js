const { DataTypes, Model } = require("sequelize");

class Image extends Model {
  static initModel(sequelize) {
    super.init(
      {
        path: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        file_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        file_extention: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
      },
      { sequelize, modelName: "Image" }
    );
    return this;
  }
}

module.exports = Image;
