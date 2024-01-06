export interface RentalOrder {
  pickLocation: string;
  leaveLocation: string;
  pickDate: Date;
  leaveDate: Date;
  pickTime: string;
  leaveTime: string;
  carId: string;
  userId: string;
  description?: string;
  _id?: string;
}
