import { Component, OnInit, Input } from '@angular/core';
import { MemberEnum } from 'src/app/utils/member-enum';
import { MemberService } from 'src/app/core/services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  member;
  memberEnum = MemberEnum;
  isLoading = true;

  constructor(private memberService: MemberService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.memberService.getMemberById(this.activatedRoute.snapshot.params.id).subscribe(memberResp => {
      this.isLoading = false;
      this.member = memberResp;
    },
    (errors) => {
      this.isLoading = false;
      alert(errors);
    });
  }

}
