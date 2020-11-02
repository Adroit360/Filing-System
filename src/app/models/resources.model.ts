export class Resource
{
  [x: string]: any;
  public Name:string;
  public date: string;

  constructor(Name:string, date:string){
    this.Name=Name;
    this.date=date;
  }
}
