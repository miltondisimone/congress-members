import { Component, OnInit } from '@angular/core';
import { MemberService } from '../core/services/member.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Member } from '../core/models/member.model';
import { MemberEnum } from '../utils/member-enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import _ from 'lodash';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  public memberEnum = MemberEnum;
  requestForm: FormGroup;
  chambers = ['house', 'senate'];
  congressList: number[];
  page = 1;
  pageSize = 7;
  collectionSize;
  members: Member[];
  allMembers;
  filters: any = {};


  constructor(private memberService: MemberService, private modalService: NgbModal) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      chamber: new FormControl(null),
      congress: new FormControl(null)
    });
  }

  openDetailsModal(member) {
    const modalRef = this.modalService.open(MemberDetailComponent, {size: 'lg'});
    modalRef.componentInstance.member = member;
  }

  paginateMembers(members: Member[]) {
    console.log(members)
    this.collectionSize = members.length;
    return members
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  pageChange() {
    this.members = this.paginateMembers(this.allMembers);
  }


  selectChamber() {
    this.congressList = this.memberService.generateCongressNumberList(this.requestForm.get('chamber').value);
  }

  getMembers() {
    const congressNumber = this.requestForm.get('congress').value;
    const chamber = this.requestForm.get('chamber').value;

    this.memberService.getCongressMembersByCongressAndChamber(congressNumber, chamber).subscribe(membersResp => {
      this.allMembers = membersResp;
      this.members = this.paginateMembers(membersResp);
    });
  }

  filterData() {
    if (this.filters.global) {
      this.members = [];

      this.members = this.paginateMembers(this.allMembers.filter(member => String(Object.values(member)).includes(this.filters.global) ));
    } else {
      this.members = this.paginateMembers(this.allMembers);
    }
  }

}



