import { Component, OnInit, Input } from '@angular/core';
import { MemberEnum } from 'src/app/utils/member-enum';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  @Input() member;
  memberEnum = MemberEnum;

  constructor() { }

  ngOnInit() {
  }

}
