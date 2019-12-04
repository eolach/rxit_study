import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { Dispenser } from '../dispenser/dispenser.model';
import { Prescriber } from '../prescriber/prescriber.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class UserHttpService {

  currentUser: User;

  // flags for participant type
  // public isDispenser: boolean;
  // public isPrescriber: boolean;
  // public selectedPrescriber: Prescriber;
  // public selectedDispenser: Dispenser;

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
    return this.http.post<User>('/api-token-auth/',
      JSON.stringify(user), this.httpOptions)
      .catch((error: any) => {
        console.log('error');
        return Observable.throw(error.statusText);
      }
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
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
    const _token = 'JWT ' + this.token;
    console.log('Using token ', this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };
    const url = `/api/dispenser/${id}`;
    return this.http.get<Dispenser>(url, httpOptions);
  }

  getPrescriber(id: number): Observable<Prescriber> {
    console.log('Getting prescriber index ', id);
    const _token = 'JWT ' + this.token;
    console.log('Using token ', this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };const url = `/api/prescriber/${id}`;
    return this.http.get<Prescriber>(url, httpOptions);

  }

  updatePrescriber(prescriber: Prescriber): Observable<any> {
    console.log('updating prescriber index ', prescriber.pk);
    const _token = 'JWT ' + this.token;
    console.log('Using token ', this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };
    const url = `/api/prescriber/${prescriber.pk}`;
    console.log('about to patch prescriber: ', prescriber);
    return of(this.http.put(url, prescriber, httpOptions)
      .subscribe(
        data => {
          console.log('put returned ', data);
        }
      ));
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
    const url = `/api/dispenser/${dispenser.pk}`;
    console.log('about to patch dispenser: ', dispenser);
    return of(this.http.put(url, dispenser, httpOptions)
      .subscribe(
        data => {
          console.log('put returned ', data);
        }
      )
      );
  }

  refreshToken() { }

  logout() { }

}
