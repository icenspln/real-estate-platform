import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export default User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(40),
    max: 40,
  },
  role: {
    type: DataTypes.ENUM("guest", "agent", "admin"),
    allowNull: false,
    defaultValue: "guest",
  },
});

User.sync();
