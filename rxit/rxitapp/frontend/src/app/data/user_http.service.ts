import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { Dispenser } from '../dispenser/dispenser.model';
import { Prescriber } from '../prescriber/prescriber.model';
import { Observable, of } from 'rxjs';

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
      // .subscribe(
      //   data => {
      //     this.updateData(data['token']);
      //   },
      //   err => {
      //     this.errors = err['error'];
      //     console.log(this.errors);
      //   }
      // );
  }

  getUser(the_token) {
    console.log('Getting user detail', the_token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + the_token
      })
    };
    const url = `/api/users/2`;
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

  updateDispenser(id) {
    // console.log('updating prescriber index ', id);
    // return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
  }

  refreshToken() { }

  logout() { }

  // private updateData(token) {
  //   this.token = token;
  //   this.errors = [];

  //   // decode the token to read the username and expiration timestamp
  //   const token_parts = this.token.split(/\./);
  //   const token_decoded = JSON.parse(window.atob(token_parts[1]));
  //   this.token_expires = new Date(token_decoded.exp * 1000);
  //   this.username = token_decoded.username;
  //   console.log('logged in ', this.username);

  //   if (this.errors.length === 0) {
  //     this.prepareUser();
  //   }

  // }

  // private prepareUser() {
  //   this.extractDetails();
  // }

  // private resolveParticipant(type: string, index: number, ) {
  //   this.isDispenser = false;
  //   this.isPrescriber = false;
  //   console.log('Resolving ', type, ' and ', index);
  //   if (type === 'dispenser') {
  //     this.isDispenser = true;
  //     console.log('Choosing participant', index);
  //     this.getDispenser(index)
  //       .subscribe((data: Dispenser) => {
  //         this.selectedDispenser = data;
  //         console.log('Selecting in ', this.selectedDispenser);
  //       });
  //   } else if (type === 'prescriber') {
  //     this.isPrescriber = true;
  //     this.getPrescriber(index)
  //       .subscribe((data: Prescriber) => {
  //         // this.selectedPrescriber = prescriber;
  //         console.log('Logging in ', index);
  //       });
  //   }
  //   // console.log('Logging in ', user);
  //   return;
  // }
}
