import { Injectable } from '@angular/core';
import { User } from '../user/user.model';;
import { Observable, of } from 'rxjs';

@Injectable()
export class UserTestService {

  ELEMENT_DATA: User[] = [
    { name: 'harbourfront', password: 'harbour191', participant_type: 'prescriber', participant_index: 1 },
    { name: 'mapleland', password: 'mapleland191', participant_type: 'dispenser', participant_index: 1 },
    { name: 'lethbridgecoll', password: 'lethbridgecoll191', participant_type: 'prescriber', participant_index: 2 },
    { name: 'nsisi', password: 'nsisi191', participant_type: 'prescriber', participant_index: 3 },
    { name: 'woodsRx', password: 'woodsRx191', participant_type: 'dispenser', participant_index: 2 },
    { name: 'southgate', password: 'southgate191', participant_type: 'prescriber', participant_index: 4 },
    { name: 'ambis', password: 'ambis191', participant_type: 'prescriber', participant_index: 5 },
    { name: 'campus', password: 'campus191', participant_type: 'dispenser', participant_index: 3 },
  ];
  categories = [
    { value: 'Web-Development', viewValue: 'Web Development' },
    { value: 'Android-Development', viewValue: 'Android Development' },
    { value: 'IOS-Development', viewValue: 'IOS Development' }
  ];

  constructor() {
  }

  login(username, password) {
    console.log('Getting user ', username)
    return of (this.ELEMENT_DATA.find(user => user.name === username));
  }

}