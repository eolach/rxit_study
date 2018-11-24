import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { Dispenser } from '../dispenser/dispenser.model';
import { Prescriber } from '../prescriber/prescriber.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserHttpService {

  currentUser: User;

  // flags for participant type
  public isDispenser: boolean;
  public isPrescriber: boolean;
  public selectedPrescriber: Prescriber;
  public selectedDispenser: Dispenser;

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

 // error messages received from the login attempt
  public errors: any = [];
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }


  login(user) {
    console.log('Getting user ', user);
    // return of(this.ELEMENT_DATA.find(user => user.name === username));
    return this.http.post('/api-token-auth/', JSON.stringify(user), this.httpOptions);
  }

  getUser(username: string) {
    console.log('Getting user detail', this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };
    const url = `/api/user/${username}`;
    return this.http.get(url);
  }

  refreshToken() { }

  logout() { }


/*
  Methods related to the participants
*/
  getDispenser(id: number): Observable<Dispenser> {
    console.log('Getting dispenser index ', id);
    const url = `/api/dispensers/${id}`;
    return this.http.get<Dispenser>(url);
  }

  updateDispenser(dispenser: Dispenser, the_token: string): Observable<any> {
    // console.log('updating prescriber index ', id);
    const _token = 'JWT ' + the_token;
    console.log('Using token ', _token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + the_token
      })
    };
    const url = `/api/dispensers/${dispenser.id}`;
    return this.http.put(url, JSON.stringify(dispenser), httpOptions);
  }

  getPrescriber(id: number): Observable<Prescriber> {
    console.log('Getting prescriber index ', id);
     const url = `/api/prescribers/${id}`;
    return this.http.get<Prescriber>(url);

  }

  updatePrescriber(id) {
    // console.log('updating prescriber index ', id);
    // return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
  }

}
