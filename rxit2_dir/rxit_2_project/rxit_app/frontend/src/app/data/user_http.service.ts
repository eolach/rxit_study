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
    // const url = `/api/user/${username}`;
    const url = `/api/user/${username}`;
    return this.http.get(url);
  }

  getDispenser(id: number): Observable<Dispenser> {
    console.log('Getting dispenser index ', id);
    const url = `/api/dispensers/${id}`;
    return this.http.get<Dispenser>(url);
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

  updateDispenser(dispenser: Dispenser): Observable<any> {
    // console.log('updating prescriber index ', id);
    const _token = 'JWT ' + this.token;
    console.log('Using token ', this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };
    const url = `/api/dispensers/${dispenser.pk}`;
    console.log('dispenser ', dispenser);
    return of (this.http.put(url, JSON.stringify(dispenser), httpOptions)
    .subscribe(
      data => {
        console.log('put returned ', data);
      }
    ));
  }

  refreshToken() { }

  logout() { }

  // Utility functions to interpret the user login

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    console.log('logged in ', this.username);

   }
}