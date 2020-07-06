import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';



const members: Routes = [
    {
        path: '',
        component: MembersComponent,
    },
    {
      path: 'detail',
      component: MemberDetailComponent,
    },
];

export const MEMBER_ROUTES = RouterModule.forRoot(members, {useHash: true});
