import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Account = sequelize.define("Account", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  accountNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
  balance: { type: DataTypes.DECIMAL(18,2), defaultValue: 0 },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
});
export default Account;
