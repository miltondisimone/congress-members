import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MEMBER_ROUTES } from './members/members.route';


@NgModule({
  imports: [MEMBER_ROUTES],
  exports: [RouterModule]
})
export class AppRoutingModule { }
