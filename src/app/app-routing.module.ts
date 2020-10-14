import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DbtestComponent} from './dbtest/dbtest.component';


const routes: Routes = [
  {path:'',component:DbtestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
