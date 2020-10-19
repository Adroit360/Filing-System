export class User{
  [x: string]: any;

  constructor(public email:string, public firstName: string, public lastName: string, public position: string){
  }
}
