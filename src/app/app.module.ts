import { LandingComponent } from './landing/landing.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { ManageUserComponent } from './content/manage-user/manage-user.component';
import { EditUserComponent } from './content/edit-user/edit-user.component';
import { AddNewUserComponent } from './content/add-new-user/add-new-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditUserDetailsComponent} from './content/edit-user-details/edit-user-details.component'
import { SidebarModule } from 'ng-sidebar';
import { EmptyComponent } from './content/empty/empty.component';

import { SectionComponent } from './content/section/section.component';
import { UserService } from './services/User.service';
import { LoginComponent } from './login/login.component';
import { HompageComponent } from './hompage/hompage.component';
import {ModalComponent} from './modal/modal.component';
import { PasswordComponent} from './forgotPassword/password.component';
import { NewFolderComponent } from './new-folder/new-folder.component'
import { AdminResourceService } from './services/AdminResource.service';
import{ChatComponent} from './content/chat box/chat.component'

import { SmartTooltipAngularModule } from 'smart-tooltip-angular';
import { SharedResourcesComponent } from './content/shared-resources/shared-resources.component';
import { NewResourceComponent } from './content/new-resource/new-resource.component';
import { EditResourceComponent } from './content/edit-resource/edit-resource.component';
import { DisplayResourceComponent } from './content/display-resource/display-resource.component';
import { PreviewComponent } from './preview/preview.component';
import { TruncatePipe } from './truncate.pipe';
import { PermissionsComponent } from './content/permissions/permissions.component';
import { SentComponent } from './content/permissions/sent/sent.component';
import { ReceivedComponent } from './content/permissions/received/received.component';
import { SectionService } from './services/section.service';
import { UserListComponent } from './content/user-list/user-list.component';
import { SentApprovalsComponent } from './approvals/sent-approvals/sent-approvals.component';
import { RequestApprovalsComponent } from './approvals/request-approvals/request-approvals.component';
import { ReplyApprovalsComponent } from './approvals/reply-approvals/reply-approvals.component';
import { UserSettingsComponent } from './content/user-settings/user-settings.component';
import { SearchComponent } from './content/search/search.component';
import { TilteCasePipe } from './tilte-case.pipe';
import { DashboardComponent } from './content/dashboard/dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuComponent,
    ChatComponent,
    ContentComponent,
    ManageUserComponent,
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
    SharedResourcesComponent,
    NewResourceComponent,
    EditResourceComponent,
    DisplayResourceComponent,
    PreviewComponent,
    TruncatePipe,
    PermissionsComponent,
    SentComponent,
    ReceivedComponent,
    UserListComponent,
    SentApprovalsComponent,
    RequestApprovalsComponent,
    ReplyApprovalsComponent,
    UserSettingsComponent,
    SearchComponent,
    TilteCasePipe,
    DashboardComponent,
    LandingComponent
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
    FormsModule,
    SidebarModule.forRoot(),
    SmartTooltipAngularModule,
  ],

  providers: [UserService,AdminResourceService, SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
