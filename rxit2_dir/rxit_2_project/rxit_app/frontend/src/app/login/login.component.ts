import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// import { UserService } from '../core/user.service';
import { UserHttpService } from '../data/user_http.service';
import { throwError } from 'rxjs';
import { User } from '../user/user.model';
import { Prescriber } from '../prescriber/prescriber.model';
import { Dispenser } from '../dispenser/dispenser.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public user: User;

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  // flags for participant type
  public isDispenser: boolean;
  public isPrescriber: boolean;
  public selectedPrescriber: Prescriber;
  public selectedDispenser: Dispenser;

   // token of the logged in user
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;
  public errors: any = [];

  constructor(
    private _userService: UserHttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  login() {
    this.submitted = true;
    this.selectedDispenser = undefined;
    this.selectedPrescriber = undefined;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid submission');
      return;
    }

    this.loading = true;


    this._userService.login({ username: this.f.username.value, password: this.f.password.value })
      .subscribe(
        data => {
          this.updateData(data['token']);
        },
        err => {
          this.errors = err['error'];
          console.log(this.errors);
        }
      );

    // if (this.username) {
    //   console.log('authorized ', this.username);
    // } else {
    //   console.log('nothing authorized ');
    // }

  }

  private updateData(token) {
    this.token = token;
    this.setToken();
    this.errors = [];
    console.log('Current token', this.token);

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    console.log('logged in ', this.username);

    if (this.errors.length === 0) {
      this.prepareUser();
    }

  }

  private prepareUser() {
    this.getUserDetails();
  }

  private getUserDetails() {
    this._userService.getUser(this.username)
      .subscribe((data) => {
        console.log('details ', data, ' type ', typeof (data[0]));
        this.resolveParticipant(data['participant_type'], data['participant_index']);
        console.log('type ', data['participant_type'], ' index ', data['participant_index']);
        }
      );
  }

  setToken() {
    this._userService.token = this.token;
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

  private resolveParticipant(type: string, index: number, ) {
    this.isDispenser = false;
    this.isPrescriber = false;
    console.log('Resolving ', type, ' and ', index);
    if (type === 'dispenser') {
      this.isDispenser = true;
      console.log('Choosing participant', index);
      this._userService.getDispenser(index)
        .subscribe((data: Dispenser) => {
          this.selectedDispenser = data;
          console.log('Selecting in ', this.selectedDispenser);
        });
    } else if (type === 'prescriber') {
      this.isPrescriber = true;
      this._userService.getPrescriber(index)
        .subscribe((data: Prescriber) => {
          this.selectedPrescriber = data;
          console.log('Logging in ', index);
        });
    }
    // console.log('Logging in ', user);
    return;
  }
}