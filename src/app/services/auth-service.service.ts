import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  constructor(public afAuth:AngularFireAuth) { }

  // create account for user
  signUp(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
        .then((result)=>{
          console.log("user created successfully");
          // send invitation to user via email address provided
          this.afAuth.sendPasswordResetEmail(email).then(
            () => {
              console.log("password reset link sent successfully");
            },
            err => {
              // handle errors
              console.log("failed  reset link ");
            }
          );
        })
        .catch((error)=>{
          console.log("An error occured");
        })
  }


  SignIn(email,password){
      return this.afAuth.signInWithEmailAndPassword(email,password)
        .then((result)=>{
            console.log("login successful")
        })
        .catch((error)=>{
          console.log("an error occured");
        })
  }
}
