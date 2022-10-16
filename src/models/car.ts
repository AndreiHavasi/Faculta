import mongoose from 'mongoose';

export interface ICar {
  name: string,
  seats: number,
  engine: string,
  transmission: string,
  rate: number,
  pickDate: Date[],
  leaveDate: Date[],
  pickTime: string[],
  leaveTime: string[]
}

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  engine: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  pickDate: {
    type: [Date],
    required: true
  },
  leaveDate: {
    type: [Date],
    required: true
  },
  pickTime: {
    type: [String],
    required: true
  },
  leaveTime: {
    type: [String],
    required: true
  }
});

const Cars = mongoose.model<ICar>("Car", CarSchema);
export default Cars;