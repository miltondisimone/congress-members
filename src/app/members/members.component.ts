import { Component, OnInit } from '@angular/core';
import { MemberService } from '../core/services/member.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {


  requestForm: FormGroup;
  chambers = ['house', 'senate'];
  congressList: number[];

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      chamber: new FormControl(null),
      congress: new FormControl(null)
    });
  }


  selectChamber() {
    console.log(this.requestForm)
    this.congressList = this.memberService.generateCongressNumberList(this.requestForm.get('chamber').value);
  }

}


interface RequestForm {
  congress: number;
  chamber: string;
}


