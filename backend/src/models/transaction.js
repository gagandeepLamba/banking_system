import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.ENUM('credit','debit'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(18,2), allowNull: false },
  balanceAfter: { type: DataTypes.DECIMAL(18,2), allowNull: false },
  accountId: { type: DataTypes.INTEGER, allowNull: false },
  createdBy: { type: DataTypes.INTEGER }, // To track who created the transaction (admin)
});
export default Transaction;
