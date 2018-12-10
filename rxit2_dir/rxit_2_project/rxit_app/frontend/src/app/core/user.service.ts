import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public token: string;
  private tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwib3JpZ19pYXQiOjE1MjgwNjg4NDEsInVzZXJfaWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImV4cCI6MTUyODA3MjQ0MX0.oxqzt-d2l5Bl473KwObsUetlKS2uOMXn7vqcHcSX5Gg';
  public token_expires: Date;
  public username: string;
  public participant_type: string;
  public error: any = [];

  constructor() {}

  public login(user) {
      this.updateData(this.tempToken);
      this.participant_type = 'dispenser';
      console.log('Called login service');
  }

  private updateData(token) {
    this.token = token;
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    console.log('token ', this.token);
  }
}
