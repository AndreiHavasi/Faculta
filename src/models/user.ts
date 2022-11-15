import mongoose from 'mongoose';

const roles = ['admin', 'client'] as const;
type Role = typeof roles[number];

export interface IUser {
  username: string;
  password: string;
  role: Role;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: roles,
  },
});

const Users = mongoose.model<IUser>('User', UserSchema);
export default Users;
