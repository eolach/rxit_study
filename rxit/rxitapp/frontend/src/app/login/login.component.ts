import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// import { UserService } from '../core/user.service';
import { UserTestService } from '../data/user_test.service';
import { throwError } from 'rxjs';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';
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

  constructor(
    private _userService: UserTestService,
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
    } else if (user.participant_type === 'prescriber') {
      this.isDispenser = false;
    }
    console.log('Logging in ', user.name);
    return;
  }
}
