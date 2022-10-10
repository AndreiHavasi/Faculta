import mongoose from 'mongoose';

export interface IOrder {
  pickLocation: string,
  leaveLocation: string,
  pickDate: Date,
  leaveDate: Date,
  pickTime: string,
  leaveTime: string,
  id: number,
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
  id: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

const Orders = mongoose.model<IOrder>("Order", OrderSchema);
export default Orders;