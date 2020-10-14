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
      return this.afAuth.signInWithEmailAndPassword(email,password)
        .then((result)=>{
            console.log("login successful");
            return result;
        })
        .catch((error)=>{
          console.log("an error occured");
          return error;
        });
  }

  SignOut(){
    return this.afAuth.signOut();
  }
}
