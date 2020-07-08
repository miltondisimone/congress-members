import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {

  }

  getMemberById(memberId: string): Observable<any> {
    const resourceUrl = `https://api.propublica.org/congress/v1/members/${memberId}.json`;

    const options = {
      headers: new HttpHeaders({
        'X-API-KEY': 'qrAdSWomcf6yCNhnCY5HL9MpWMqDhRE4wYWeDrhG'
      }),
    };
    console.log(memberId)

    return this.http.get(resourceUrl, options).pipe(map( (resp: any) => {
      return resp.results[0];
    }));

  }

  getCongressMembersByCongressAndChamber(congress: string, chamber: number): Observable<any> {
    const resourceUrl = `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`;

    const options = {
      headers: new HttpHeaders({
        'X-API-KEY': 'qrAdSWomcf6yCNhnCY5HL9MpWMqDhRE4wYWeDrhG'
      }),
    };

    return this.http.get(resourceUrl, options).pipe(map( (resp: any) => {
      return resp.results[0].members;
    }));
  }

  generateCongressNumberList(chamber: string) {
    let congressList = [];
    let minCongressNumber;

    chamber === 'house' ? minCongressNumber = 80 : minCongressNumber = 102;
    for (let i = minCongressNumber; i <= 116; i++) {
        congressList = [...congressList, i];
    }

    console.log(congressList)

    return congressList;
  }
}
