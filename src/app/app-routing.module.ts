import { ReceivedComponent } from './content/permissions/received/received.component';
import { SentComponent } from './content/permissions/sent/sent.component';
import { PermissionsComponent } from './content/permissions/permissions.component';
import { HompageComponent } from './hompage/hompage.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { ManageUserComponent } from './content/manage-user/manage-user.component';
import { DisplayResourceComponent } from './content/display-resource/display-resource.component';
import { AddNewUserComponent } from './content/add-new-user/add-new-user.component';
import {EditUserDetailsComponent} from './content/edit-user-details/edit-user-details.component';
import { EmptyComponent } from './content/empty/empty.component';
import { SharedResourcesComponent} from './content/shared-resources/shared-resources.component';
import { NewResourceComponent} from './content/new-resource/new-resource.component';
import { EditResourceComponent} from './content/edit-resource/edit-resource.component';
import { UserListComponent } from './content/user-list/user-list.component';
import { UserSettingsComponent } from './content/user-settings/user-settings.component';
import { SearchComponent} from './content/search/search.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorPageComponent } from './error-page/error-page.component';
//import { SectionComponent } from './content/section/section.component';



const routes: Routes = [
  {path: 'home', component: HompageComponent, children: [
    // {path: '/:id/:name', component: SectionComponent},
    {path: 'content', component: ContentComponent, children: [

      {path: ':entityId/:sectionId/:sectionName/:directoryId/:directory', component: EmptyComponent},
      // {path: ':sectionId/:sectionName/:directoryId/:directory', component: EmptyComponent},

      {path: 'dashboard', component: DashboardComponent},
      {path: 'manageUsers', component: ManageUserComponent},
      {path: 'user-settings', component: UserSettingsComponent},
      {path: 'SharedResources', component: SharedResourcesComponent},
      {path: 'SharedResources/:Name/:id', component: DisplayResourceComponent},
      {path: 'userlists', component:UserListComponent},
      {path: 'AddUser', component: AddNewUserComponent},
      {path: 'search', component: SearchComponent},
      {path: 'editUserDetails', component: EditUserDetailsComponent},
      {path: 'CreateResource', component:NewResourceComponent},
      {path: 'EditResource', component: EditResourceComponent},
      {path: 'approvals', component: PermissionsComponent, children: [
        {path: 'sent', component: SentComponent},
        {path: 'received', component: ReceivedComponent},
      ]},

      {path: '**', redirectTo:"/not-found"},
    ]},

  ]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'welcome', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'SignUp', component: SignUpComponent },
  {path: '**', component: ErrorPageComponent},
  // {path: '**', component: ErrorPageComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
