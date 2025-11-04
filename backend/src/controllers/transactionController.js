import { sequelize, Account, Transaction } from '../models/index.js';
import { logAction } from '../utils/logger.js';
export const credit = async (req, res) => {
  const { accountId, amount, description } = req.body;
  const t = await sequelize.transaction();
  try {
    const account = await Account.findByPk(accountId, { transaction: t, lock: true });
    if (!account) { await t.rollback(); return res.status(404).json({ message: 'Account not found' }); }
    account.balance = parseFloat(account.balance) + parseFloat(amount);
    await account.save({ transaction: t });
    await Transaction.create({ type: 'credit', amount, balanceAfter: account.balance, accountId, createdBy: req.user.id }, { transaction: t });
    await logAction({ log: `Credit ${amount} to acc ${accountId}`, haveError:false, user_id: req.user.id, type:2 });
    await t.commit();
    res.json({ message: 'Credited', balance: account.balance });
  } catch (err) {
    await t.rollback();
    console.error(err);
    await logAction({ log: `Error credit: ${err.message}`, haveError:true, user_id: req.user?.id, type:2 });
    res.status(500).json({ message: 'Server error' });
  }
};
export const debit = async (req, res) => {
  const { accountId, amount, description } = req.body;
  const t = await sequelize.transaction();
  try {
    const account = await Account.findByPk(accountId, { transaction: t, lock: true });
    if (!account) { await t.rollback(); return res.status(404).json({ message: 'Account not found' }); }
    if (parseFloat(amount) > parseFloat(account.balance)) {
      await logAction({ log: `Insufficient funds ${accountId}`, haveError:true, user_id: req.user?.id, type:2 });
      await t.rollback();
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    account.balance = parseFloat(account.balance) - parseFloat(amount);
    await account.save({ transaction: t });
    await Transaction.create({ type: 'debit', amount, balanceAfter: account.balance, accountId, createdBy: req.user.id }, { transaction: t });
    await logAction({ log: `Debit ${amount} from acc ${accountId}`, haveError:false, user_id: req.user.id, type:2 });
    await t.commit();
    res.json({ message: 'Debited', balance: account.balance });
  } catch (err) {
    await t.rollback();
    console.error(err);
    await logAction({ log: `Error debit: ${err.message}`, haveError:true, user_id: req.user?.id, type:2 });
    res.status(500).json({ message: 'Server error' });
  }
};
