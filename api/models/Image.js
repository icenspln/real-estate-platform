const { DataTypes, Model } = require("sequelize");

class Image extends Model {
  static initModel(sequelize) {
    super.init(
      {
        originalName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        encoding: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        mimeType: { type: DataTypes.STRING(255), allowNull: false },

        destination: { type: DataTypes.STRING(255), allowNull: false },
        fileName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        size: {
          type: DataTypes.INTEGER(),
          allowNull: false,
        },
      },
      { sequelize, modelName: "Image" }
    );
    return this;
  }
}

module.exports = Image;
