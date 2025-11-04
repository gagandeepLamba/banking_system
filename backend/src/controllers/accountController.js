import { User, Account } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { logAction } from '../utils/logger.js';

export const getAllAccounts = async (req, res) => {
  const accounts = await Account.findAll({ include: User });
  res.json(accounts);
};

export const createAccount = async (req, res) => {
  const { name, email, mobile, profilePicture, initialBalance=0 } = req.body;
  let user = await User.findOne({ where: { email } });
  if (!user) {
    // When admin creates an account, create user with active status
    const bcrypt = await import('bcryptjs');
    const hash = await bcrypt.default.hash('1234', 10);
    user = await User.create({ name, email, mobile, password: hash, status: 'active', role: 'user', profilePicture });
  } else {
    // If user exists but was inactive (registered themselves), activate them
    if (user.status === 'inactive') {
      await user.update({ status: 'active' });
    }
  }
  const accountNumber = 'AC' + Date.now().toString().slice(-8) + Math.floor(Math.random()*900+100);
  const account = await Account.create({ accountNumber, userId: user.id, balance: initialBalance, status: 'active' });
  await logAction({ log: `Admin ${req.user.id} created account ${account.id}`, haveError:false, user_id: req.user.id, type:1 });
  res.status(201).json(account);
};


export const deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    // Only delete the account, not the user
    await account.destroy();

    // Log the deletion
    await logAction({
      log: `Admin ${req.user.id} deleted account ${accountId}`,
      haveError: false,
      user_id: req.user.id,
      type: 2,
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    await logAction({
      log: `Error deleting account: ${err.message}`,
      haveError: true,
      user_id: req.user?.id,
      type: 2,
    });
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, address, profilePicture } = req.body;

    // Only allow updating name, address, and profilePicture
    const updates = {};
    if (name) updates.name = name;
    if (address) updates.address = address;
    if (profilePicture) updates.profilePicture = profilePicture;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Users cannot update their email or mobile number
    if (req.body.email || req.body.mobile) {
      return res.status(403).json({ message: 'Cannot update email or mobile number' });
    }

    await user.update(updates);
    await logAction({
      log: `User ${userId} updated profile`,
      haveError: false,
      user_id: userId,
      type: 1
    });

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    await logAction({
      log: `Error updating profile: ${err.message}`,
      haveError: true,
      user_id: req.user?.id,
      type: 1
    });
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, address, profilePicture, status } = req.body;

    // Allow admins to update more fields
    const updates = {};
    if (name) updates.name = name;
    if (address) updates.address = address;
    if (profilePicture) updates.profilePicture = profilePicture;
    if (status) updates.status = status;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(updates);
    await logAction({
      log: `Admin ${req.user.id} updated user ${userId}`,
      haveError: false,
      user_id: req.user.id,
      type: 1
    });

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    await logAction({
      log: `Error updating user: ${err.message}`,
      haveError: true,
      user_id: req.user?.id,
      type: 1
    });
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: [{
        model: Account,
        include: [Transaction]
      }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const account = user.Accounts[0]; // Assuming one account per user
    if (!account) return res.status(404).json({ message: 'Account not found' });

    res.json({
      account: {
        id: account.id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        status: account.status
      },
      transactions: account.Transactions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'No Transactions' });
  }
};
