import { Request, Response } from 'express';
import Order, { IOrder } from '../models/order';

const getOrders = async (request: Request, response: Response) => {
  try {
    const result = await Order.find();

    return response.status(200).json(result);
  } catch (err) {
    return response.status(500).json(err);
  }
};

const addOrder = async (request: Request, response: Response) => {
  try {
    const order = new Order(request.body as IOrder);
    const result = await Order.create(order);

    return response.status(200).json(result);
  } catch (err) {
    return response.status(500).json(err);
  }
};

const updateOrder = async (request: Request, response: Response) => {
  try {
    const result = await Order.findByIdAndUpdate(request.body._id, { carId: request.body.carId });

    return response.status(200).json(result);
  } catch (err) {
    return response.status(500).json(err);
  }
};

const deleteOrder = async (request: Request, response: Response) => {
  try {
    const result = await Order.deleteOne(request.body as IOrder);

    return response.status(200).json(result);
  } catch (err) {
    return response.status(500).json(err);
  }
};

export default { getOrders, addOrder, updateOrder, deleteOrder };
