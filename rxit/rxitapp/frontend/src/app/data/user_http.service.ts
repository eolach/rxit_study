import { Injectable } from '@angular/core';
import { User } from '../user/user.model';;
import { Dispenser } from '../dispenser/dispenser.model';
import { Prescriber } from '../prescriber/prescriber.model';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserHttpService {

  ELEMENT_DATA: User[] = [
    { name: 'harbourfront', password: 'harbour191', participant_type: 'prescriber', participant_index: 1 },
    { name: 'mapleland', password: 'mapleland191', participant_type: 'dispenser', participant_index: 1 },
    { name: 'lethbridgecoll', password: 'lethbridgecoll191', participant_type: 'prescriber', participant_index: 2 },
    { name: 'nsisi', password: 'nsisi191', participant_type: 'prescriber', participant_index: 3 },
    { name: 'woodsRx', password: 'woodsRx191', participant_type: 'dispenser', participant_index: 2 },
    { name: 'southgate', password: 'southgate191', participant_type: 'prescriber', participant_index: 4 },
    { name: 'ambis', password: 'ambis191', participant_type: 'prescriber', participant_index: 5 },
    { name: 'campus', password: 'campus191', participant_type: 'dispenser', participant_index: 3 },
    { name: 'wlincoln', password: 'wlincoln191', participant_type: 'dispenser', participant_index: 4 },
  ];


  constructor(
    private http: HttpClient
  ) { }

  login(username, password) {
    // console.log('Getting user ', username);
    // return of(this.ELEMENT_DATA.find(user => user.name === username));
    this.http.post('/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
 }

  getDispenser(id: number): Observable<Dispenser>  {
    // console.log('Getting dispenser index ', id);
    // return of(this.DISPENSERS.find(dispenser => dispenser.id === id));
    console.log('getting dispenser ', id);
    const url = `/api/dispensers/${id}`;
    return this.http.get<Dispenser>(url));
    }

  getPrescriber(id: number): Observable<Prescriber> {
    // console.log('Getting prescriber index ', id);
    // return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
    const url = `/api/prescribers/${id}`;
    return this.http.get<Prescriber>(url);

  }

  updatePrescriber(id) {
    // console.log('updating prescriber index ', id);
    // return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
  }

  updateDispenser(id) {
    // console.log('updating prescriber index ', id);
    // return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
  }

  refreshToken() {}

  logout() {}

  private updateData(token) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;

  }

}
