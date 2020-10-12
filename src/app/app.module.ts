import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { ManageUserComponent } from './content/manage-user/manage-user.component';
import { ManageUserGroupsComponent } from './content/manage-user-groups/manage-user-groups.component';
import { EditUserComponent } from './content/edit-user/edit-user.component';
import { AddNewUserComponent } from './content/add-new-user/add-new-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditUserDetailsComponent} from './content/edit-user-details/edit-user-details.component'
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './content/empty/empty.component';
import { SectionService } from './services/Section.service';
import { SectionComponent } from './content/section/section.component';

<<<<<<< HEAD
const appRoutes: Routes=[
  {path: '', component: EmptyComponent},
  {path: ' /:id/', component: SectionComponent},
  {path: 'manageUsers', component: ManageUserComponent},
  {path: 'manageUsers/AddUser', component: AddNewUserComponent},
  {path: 'manageUserGroups', component: ManageUserGroupsComponent},

]
=======
// const appRoutes: Routes=[
//   {path: '', component: EmptyComponent},
//   {path: 'manageUsers', component: ManageUserComponent},
//   {path: 'manageUsers/AddUser', component: AddNewUserComponent},
//   {path: 'manageUserGroups', component: ManageUserGroupsComponent}
// ]
>>>>>>> 51f5d14cb23b271123ef44174b44af676b878797
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuComponent,
    ContentComponent,
    ManageUserComponent,
    ManageUserGroupsComponent,
    EditUserComponent,
    AddNewUserComponent,
    EditUserDetailsComponent,
    EmptyComponent,
    SectionComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), //initialize firebase app
    AngularFirestoreModule, //  for database features
    AngularFireAuthModule, //  for auth features,
    AngularFireStorageModule ,// for storage
    ReactiveFormsModule ,
    // RouterModule.forRoot(appRoutes)
  ],

  providers: [SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
