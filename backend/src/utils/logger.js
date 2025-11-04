import { Log } from '../models/index.js';
export const logAction = async ({ log, haveError=false, user_id=null, type=2 }) => {
  try {
    await Log.create({ log, haveError, user_id, type });
  } catch (e) {
    console.error('Failed to write log', e.message);
  }
};
