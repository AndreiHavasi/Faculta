import { Request, Response } from 'express';
import Account, { IAccount } from '../models/account';

const getAccounts = async(request: Request, response: Response) => {
  try {
    const result = await Account.find();

    return response.status(200).json(result);
  }
  catch (err) {
    return response.status(500).json(err);
  }
}

const addAccount = async(request: Request, response: Response) => {
  try {
    const account = new Account(request.body as IAccount);
    const result = await Account.create(account);

    return response.status(200).json(result);
  }
  catch (err) {
    return response.status(500).json(err);
  }
}

const updateAccount = async(request: Request, response: Response) => {
  try {
    const result = await Account
      .findByIdAndUpdate(
        request.body._id,
        {
          loggedIn: request.body.loggedIn
        });

    return response.status(200).json(result);
  }
  catch (err) {
    return response.status(500).json(err);
  }
}

export default { getAccounts, addAccount, updateAccount };