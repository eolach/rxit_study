import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { Dispenser } from './dispenser.model';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['../app.component.scss']
})
export class DispenserComponent implements OnInit {
  @Input()
  dispenser: Dispenser;

  dispenserForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  // Specify the form for the display
  createForm() {
    this.dispenserForm = this.fb.group({
      name: 'placeholder name',
      street: 'placeholder street',
      city: 'placeholder city',
      province: 'placeholder province'
    });
  }
}
