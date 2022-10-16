export interface RentalOrder {
  pickLocation: string;
  leaveLocation: string;
  pickDate: Date;
  leaveDate: Date;
  pickTime: string;
  leaveTime: string;
  description?: string;
  _id?: number;
}
