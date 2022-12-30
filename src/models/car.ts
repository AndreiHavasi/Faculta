import mongoose from 'mongoose';

export interface ICar {
  name: string;
  seats: number;
  engine: string;
  transmission: string;
  rate: number;
}

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const Cars = mongoose.model<ICar>('Car', CarSchema);
export default Cars;
