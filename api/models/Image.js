import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export default Image = sequelize.define("Image", {
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
});

Image.belongsTo(Property);

Image.sync();
