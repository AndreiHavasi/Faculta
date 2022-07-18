export class Account {
  constructor (
    public username: string,
    public password: string,
    public loggedIn: boolean,
    public id?: number
  ) { }
}
