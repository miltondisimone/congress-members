import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './members.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [MembersComponent, MemberDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
})
export class MembersModule { }
