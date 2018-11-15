import { Injectable } from '@angular/core';
import { User } from '../user/user.model';;
import { Observable, of } from 'rxjs';

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
  DISPENSERS = [
    { name: 'Mapleland IDA', street: '120 Welland Ave. Unit 10B', city: 'St.Catharines', province: 'ON', id: 1 },
    { name: 'Woods Dispensary', street: '120 Welland Ave. Unit 10B', city: 'Lethbridge', province: 'AB', id: 2 },
    { name: 'Campus Pharmacy', street: '460 St. Davids Rd #9', city: 'St. Catharines', province: 'ON', id: 3},
    { name: 'West Lincoln Pharmacy', street: '25 - 239 St. Catharines St.', city: 'Smithville', province: 'ON', id: 4 },
  ];


  PRESCRIBERS = [
    { name: 'Harbourfront Medical Group', street: '605 James St N. suite 102', city: 'Hamilton', province: 'ON', id: 1 },
    { name: 'Lethbridge College Health Services', street: '3000 College Drive', city: 'Lethbridge', province: 'AB', id: 2 },
    { name: 'Nsisi Medical Clinic', street: '414, 13th St. N', city: 'Lethbridge', province: 'AB', id: 3 },
    { name: 'Southgate Medical Centre', street: '10-15 Southgate Blvd. South', city: 'Lethbridge', province: 'AB', id: 4 },
    { name: 'Ambis and Jones Family Medicine', street: '310-15 Mountain Ave', city: 'Stoney Creek', province: 'ON', id: 5 },
  ];


  constructor() {
  }

  login(username, password) {
    // console.log('Getting user ', username);
    return of(this.ELEMENT_DATA.find(user => user.name === username));
  }

  getDispenser(id) {
    // console.log('Getting dispenser index ', id);
    return of(this.DISPENSERS.find(dispenser => dispenser.id === id));
  }

  getPrescriber(id) {
    // console.log('Getting prescriber index ', id);
    return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
  }

  updatePrescriber(id) {
    // console.log('updating prescriber index ', id);
    return of(this.PRESCRIBERS.find(prescriber => prescriber.id === id));
  }

}
