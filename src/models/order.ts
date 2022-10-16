import mongoose from 'mongoose';

export interface IOrder {
  pickLocation: string,
  leaveLocation: string,
  pickDate: Date,
  leaveDate: Date,
  pickTime: string,
  leaveTime: string,
  carId: string,
  description?: string
}

const OrderSchema = new mongoose.Schema({
  pickLocation: {
    type: String,
    required: true
  },
  leaveLocation: {
    type: String,
    required: true
  },
  pickDate: {
    type: Date,
    required: true
  },
  leaveDate: {
    type: Date,
    required: true
  },
  pickTime: {
    type: String,
    required: true
  },
  leaveTime: {
    type: String,
    required: true
  },
  carId: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

const Orders = mongoose.model<IOrder>("Order", OrderSchema);
export default Orders;