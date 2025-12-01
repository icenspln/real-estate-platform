const { Model, DataTypes } = require("sequelize");

class RefreshToken extends Model {
  static initModel(sequelize) {
    super.init(
      {
        tokenHash: {
          type: DataTypes.BLOB,
          allowNull: false,
        },
        jti: {
          type: DataTypes.BLOB,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        revokedAt: {
          type: DataTypes.DATE,
          defaultValue: null,
        },
        replacedBy: {
          type: DataTypes.BLOB,
          defaultValue: null,
        },
        ip: { type: DataTypes.STRING },
        userAgent: { type: DataTypes.STRING },
      },
      {
        sequelize,
        modelName: "RefreshToken",
      }
    );
    return this;
  }
}

module.exports = RefreshToken;
