import { Request, Response } from 'express';
import Car from '../models/car';

const getCars = async(request: Request, response: Response) => {
  try {
    const result = await Car.find();

    return response.status(200).json(result);
  }
  catch (err) {
    return response.status(500).json(err);
  }
}
const updateCar = async(request: Request, response: Response) => {
  try {
    const result = await Car
      .findByIdAndUpdate(
        request.body._id,
        {
          pickDate: request.body.pickDate,
          leaveDate: request.body.leaveDate,
          pickTime: request.body.pickTime,
          leaveTime: request.body.leaveTime
        });

    return response.status(200).json(result);
  }
  catch (err) {
    return response.status(500).json(err);
  }
}

export default { getCars, updateCar };