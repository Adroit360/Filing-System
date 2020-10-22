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
import { EditResourceComponent} from './content/edit-resource/edit-resource.component'
//import { SectionComponent } from './content/section/section.component';



const routes: Routes = [
  {path: 'home', component: HompageComponent, children: [
    // {path: '/:id/:name', component: SectionComponent},
    {path: 'content', component: ContentComponent, children: [
      {path: ':id/:name', component: EmptyComponent},
      {path: 'manageUsers', component: ManageUserComponent},
      {path: 'SharedResources', component: SharedResourcesComponent, children:[
        {path: ':id/: Name', component: DisplayResourceComponent},
      ]},
      {path: 'AddUser', component: AddNewUserComponent},
      {path: 'editUserDetails', component: EditUserDetailsComponent},
      {path: 'CreateResource', component:NewResourceComponent},
      {path: 'EditResource', component: EditResourceComponent},
      // {path: 'general', component: EmptyComponent},
    ]},

  ]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
