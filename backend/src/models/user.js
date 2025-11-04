import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  mobile: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' },
  status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'inactive' },
  address: { type: DataTypes.STRING },
  profilePicture: { type: DataTypes.STRING }
});
export default User;
