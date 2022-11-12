import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const config = process.env;

const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  const bearerHeader = request.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    request.headers['token'] = bearer[1];

    jwt.verify(request.headers['token'], config.TOKEN_KEY!, (err) => {
      if (err) {
        response.status(500).json({ message: 'Invalid token' });
      } else {
        next();
      }
    });
  } else {
    response.status(403).json({ message: 'Forbidden' });
  }
};

export default verifyToken;
