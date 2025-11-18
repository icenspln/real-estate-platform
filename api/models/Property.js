import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Image from "./Image.js";

export default Property = sequelize.define("Property", {
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    max: 20,
  },
  number: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 1,
  },
  surface_area: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  surface_area_unit: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  price_unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  address: {
    // full address
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("available", "sold", "pending"),
    allowNull: false,
    defaultValue: "available",
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Propery.hasMany(Image);

Property.sync();
