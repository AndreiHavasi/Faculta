export class Car {
  constructor (
    public name: string,
    public url: string,
    public seats: number,
    public engine: string,
    public transmission: string,
    public rate: number,
    public pickDate: Date[],
    public leaveDate: Date[],
    public pickTime: string[],
    public leaveTime: string[],
    public id?: number
  ) { }
}
