export class RentalOrder {
  constructor (
    public pickLocation: string,
    public leaveLocation: string,
    public pickDate: Date,
    public leaveDate: Date,
    public pickTime: string,
    public leaveTime: string,
    public id?: number,
    public description?: string
  ) { }
}