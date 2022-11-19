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

    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 1000 * 10,
    });
    const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: 1000 * 60 * 60 * 24,
    });
    user.refreshToken = refreshToken;
    await user.save();

    return (
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24,
      }) && response.status(201).json({ user, accessToken })
    );
  } catch (err) {
    return response.status(500).json(err);
  }
};

const logout = async (request: Request, response: Response) => {
  const cookies = request.cookies;
  if (!cookies?.refreshToken) return response.status(204);
  const refreshToken = cookies.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) {
    response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    return response.status(204);
  }

  user.refreshToken = '';
  await user.save();
  response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
  return response.status(204);
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

    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 1000 * 10,
    });
    const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: 1000 * 60 * 60 * 24,
    });
    user.refreshToken = refreshToken;
    await user.save();

    return (
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24,
      }) && response.status(200).json({ user, accessToken })
    );
  } catch (err) {
    return response.status(500).json(err);
  }
};

const handleRefreshToken = async (request: Request, response: Response) => {
  const cookies = request.cookies;
  if (!cookies?.refreshToken) return response.status(401).json({ message: 'No refresh token' });
  const refreshToken = cookies.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) return response.status(403).json({ message: 'Invalid refresh token' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (error: any, decoded: any) => {
    if (error || user.username != decoded.username)
      return response.status(403).json({ message: 'Invalid refresh token' });

    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '10s',
    });
    return response.status(200).json({ user, accessToken });
  });
};

export default { addUser, login, logout, handleRefreshToken };
