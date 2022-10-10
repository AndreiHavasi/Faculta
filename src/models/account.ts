import mongoose from 'mongoose';

export interface IAccount {
  username: string,
  password: string,
  loggedIn: boolean,
  id: number
}

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  loggedIn: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});

const Accounts = mongoose.model<IAccount>("Account", AccountSchema);
export default Accounts;