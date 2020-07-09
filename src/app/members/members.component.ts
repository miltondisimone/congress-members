import { Component, OnInit } from '@angular/core';
import { MemberService } from '../core/services/member.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Member } from '../core/models/member.model';
import { MemberEnum } from '../utils/member-enum';

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
  members: any[];
  allMembers;
  filters: any = {};
  isLoading = false;
  showAdvancedFilters = false;
  advancedFilter: string;


  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.requestForm = new FormGroup({
      chamber: new FormControl(null),
      congress: new FormControl('unselected')
    });
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  paginateMembers(members: Member[]) {
    this.collectionSize = members.length;
    return members
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  pageChange() {
    this.members = this.paginateMembers(this.allMembers);
  }


  selectChamber() {
    this.members = [];
    this.requestForm.get('congress').setValue('unselected');
    this.congressList = this.memberService.generateCongressNumberList(this.requestForm.get('chamber').value);
  }

  getMembers() {
    const congressNumber = this.requestForm.get('congress').value;
    if (congressNumber) {
      this.isLoading = true;
      const chamber = this.requestForm.get('chamber').value;

      this.memberService.getCongressMembersByCongressAndChamber(congressNumber, chamber)
      .subscribe( (membersResp) => {
        this.allMembers = membersResp;
        this.members = this.paginateMembers(membersResp);
        this.isLoading = false;
      },
      (errors) => {
        this.isLoading = false;
        alert(errors);
      });
    } else {
      return;
    }

  }

  filterData() {
    if (!this.members) {
      return;
    }
    if (this.filters.advanced || this.filters.global) {
      this.members = [];

      if (this.filters.advanced && this.showAdvancedFilters) {
        this.members = this.paginateMembers(
          this.allMembers.filter(member => String(member[this.advancedFilter]).includes(this.filters.advanced),
        ));
      } else {
        this.members = this.paginateMembers(this.allMembers.filter(member => String(Object.values(member)).includes(this.filters.global) ));
      }



    } else {
      this.members = this.paginateMembers(this.allMembers);
    }
  }

}



