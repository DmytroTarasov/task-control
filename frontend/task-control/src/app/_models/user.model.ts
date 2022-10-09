export class User {
  constructor(
    public email: string,
    public username: string,
    public created_date: string,
    public token?: string
  ) {}
}
