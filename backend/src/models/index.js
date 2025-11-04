import sequelize from "../config/db.js";
import User from "./user.js";
import Account from "./account.js";
import Transaction from "./transaction.js";
import Log from "./log.js";
// relations
User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });
Account.hasMany(Transaction, { foreignKey: 'accountId' });
Transaction.belongsTo(Account, { foreignKey: 'accountId' });
export { sequelize, User, Account, Transaction, Log };
