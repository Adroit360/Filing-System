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
import { SidebarModule } from 'ng-sidebar';
import { EmptyComponent } from './content/empty/empty.component';
import { SectionService } from './services/Section.service';
import { SectionComponent } from './content/section/section.component';
import { UserService } from './services/User.service';
import { LoginComponent } from './login/login.component';
import { HompageComponent } from './hompage/hompage.component';
import {ModalComponent} from './modal/modal.component';
import { PasswordComponent} from './forgotPassword/password.component';
import { NewFolderComponent } from './new-folder/new-folder.component'
import { UserGroupsService } from './services/UserGroups.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { SmartTooltipAngularModule } from 'smart-tooltip-angular';


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
    SectionComponent,
    LoginComponent,
    HompageComponent,
    ModalComponent,
    PasswordComponent,
    NewFolderComponent,
    SearchPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), //initialize firebase app
    AngularFirestoreModule, //  for database features
    AngularFireAuthModule, //  for auth features,
    AngularFireStorageModule , // for storage
    ReactiveFormsModule ,
    SmartTooltipAngularModule,//tooltip

    SidebarModule.forRoot(),
  ],

  providers: [SectionService,UserService,UserGroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
