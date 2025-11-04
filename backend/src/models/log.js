import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Log = sequelize.define("Log", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  log: { type: DataTypes.TEXT, allowNull: false },
  haveError: { type: DataTypes.BOOLEAN, defaultValue: false },
  user_id: { type: DataTypes.INTEGER },
  type: { type: DataTypes.INTEGER, defaultValue: 2 }
});
export default Log;
