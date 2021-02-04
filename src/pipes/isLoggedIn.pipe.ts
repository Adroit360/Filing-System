import { Pipe, PipeTransform } from "@angular/core";
import { AuthServiceService } from "src/services/auth-service.service";

@Pipe({ name: "isLoggedIn" })
export class isLoggedInPipe implements PipeTransform{
    constructor(private authService:AuthServiceService){}
    transform(value: any, ...args: any[]) {
        let isLoggedIn =  this.authService.isLoggedIn();
        console.info("isLoggedIn",isLoggedIn);
        return isLoggedIn;
    }
}
