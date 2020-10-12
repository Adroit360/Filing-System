export class User{
  public Email: string;
  public FirstName: string;
  public LastName: string;
  public position: string;

  constructor(email:string, firstName: string, lastName: string, position: string){
    this.Email= email;
    this.FirstName=firstName;
    this.LastName=lastName;
    this.position=position;

  }
}
