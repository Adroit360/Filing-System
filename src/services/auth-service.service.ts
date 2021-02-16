import { Injectable } from '@angular/core';
// import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

    
  
  constructor(public afAuth:AngularFireAuth) { }

  // create account for user
  signUp(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
        .then(async result=>{
          if(result){
            console.log("user created successfully",result);
            // send invitation to user via email address provided
            await this.afAuth.sendPasswordResetEmail(email).then(
              () => {
                console.log("password reset link sent successfully");
                return result;
              },
              err => {
                // handle errors
                console.log("failed  reset link ");
  
              }
            );
          }

        })
        .catch((error)=>{
          console.log("An error occured",error.code);
          return error.code;
          
        });
  }


  SignIn(email,password){
      return this.afAuth.signInWithEmailAndPassword(email,password);
             
  }

  SignOut(){
    return this.afAuth.signOut();
  }

  ResetPassword(email){
    return this.afAuth.sendPasswordResetEmail(email);
  }

  isLoggedIn() : boolean {
    console.log("CURRENT USER",localStorage.getItem("user"));
    if(localStorage.getItem("user")) return true;
    else return false;
  }
}
