export class Group{
  public Department:string;
  public numb: string;
  public date: string;

  constructor(Name:string, num:string, date:string){
    this.Department=Name;
    this.numb=num;
    this.date=date;
  }
}
