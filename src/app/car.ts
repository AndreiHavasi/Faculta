export class Car {
  constructor (
    public name: string,
    public url: string,
    public pickDate?: Date,
    public leaveDate?: Date,
    public pickTime?: string,
    public leaveTime?: string,
    public id?: number
  ) { }
}
