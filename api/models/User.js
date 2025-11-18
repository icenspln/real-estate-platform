const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    // username is optional
    type: DataTypes.STRING(40),
    //allowNull: false,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM("guest", "agent", "admin"),
    allowNull: false,
    defaultValue: "guest",
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.sync({ force: true });

module.exports = User;
