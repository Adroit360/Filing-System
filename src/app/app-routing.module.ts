import { HompageComponent } from './hompage/hompage.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { ManageUserComponent } from './content/manage-user/manage-user.component';
import { ManageUserGroupsComponent } from './content/manage-user-groups/manage-user-groups.component';
import { EditUserComponent } from './content/edit-user/edit-user.component';
import { AddNewUserComponent } from './content/add-new-user/add-new-user.component';
import {EditUserDetailsComponent} from './content/edit-user-details/edit-user-details.component';
import { EmptyComponent } from './content/empty/empty.component';
import { SectionComponent } from './content/section/section.component';


const routes: Routes = [
  {path: 'home', component: HompageComponent, children: [
    // {path: '/:id/:name', component: SectionComponent},
    {path: 'content', component: ContentComponent, children: [
      {path: ':id/:name', component: EmptyComponent},
      {path: 'manageUsers', component: ManageUserComponent},
      {path: 'manageUserGroups', component: ManageUserGroupsComponent},
      {path: 'AddUser', component: AddNewUserComponent},
      {path: 'editUserDetails', component: EditUserDetailsComponent}
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
