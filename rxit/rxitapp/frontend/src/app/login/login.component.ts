import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// import { UserService } from '../core/user.service';
import { UserHttpService } from '../data/user_http.service';
import { throwError } from 'rxjs';
import { Prescriber } from '../prescriber/prescriber.model';
import { Dispenser } from '../dispenser/dispenser.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public user: any;
  public isDispenser: boolean;
  public isPrescriber: boolean;

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  selectedPrescriber: Prescriber;
  selectedDispenser: Dispenser;

  constructor(
    private _userService: UserHttpService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
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


    this._userService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        user => {
          this.user = user;
          console.log('User participant_type is ', user.participant_type);
          this.resolveParticipant(user);
        }
      );
  }

  resolveParticipant(user) {
    this.isDispenser = false;
    this.isPrescriber = false;
    if (user.participant_type === 'dispenser') {
      this.isDispenser = true;
      this._userService.getDispenser(user.participant_index)
        .subscribe(dispenser => {
          this.selectedDispenser = dispenser;
          console.log('Logging in ', this.selectedDispenser);
        });
    } else if (user.participant_type === 'prescriber') {
      this.isPrescriber = true;
      this._userService.getPrescriber(user.participant_index)
        .subscribe(prescriber => {
          this.selectedPrescriber = prescriber;
          console.log('Logging in ', this.selectedPrescriber);
        });
    }
    // console.log('Logging in ', user);
    return;
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }
}
