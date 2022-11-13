import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const addUser = async (request: Request, response: Response) => {
  try {
    const { username, password, role } = request.body;

    const alreadyExists = await User.findOne({ username });
    if (alreadyExists) {
      return response.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 16),
      role,
    });

    user.token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY!, { expiresIn: 86400 * 7 });
    await user.save();

    return response.status(200).json(user);
  } catch (err) {
    return response.status(500).json(err);
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(401).json({ message: 'Invalid username' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return response.status(403).json({ message: 'Invalid password' });
    }

    user.token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY!, { expiresIn: 86400 * 7 });
    await user.save();

    return response.status(200).json(user);
  } catch (err) {
    return response.status(500).json(err);
  }
};

export default { addUser, login };
