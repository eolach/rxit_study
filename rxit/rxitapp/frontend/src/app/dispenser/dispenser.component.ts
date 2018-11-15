import { Component, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { Dispenser } from './dispenser.model';
import { UserHttpService } from '../data/user_http.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['../core/participant.component.css']
})

export class DispenserComponent implements OnChanges {
  @Input()
  dispenser: Dispenser;
  dispenserSubs: Subscription;
  panelOpenState = false;

  dispenserForm: FormGroup;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(
    private route: ActivatedRoute,
    private dispenserService: UserHttpService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnChanges(): void {
    this.rebuildForm();
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.dispenserForm = this.fb.group({
      name: ['name'],
      street: ['street'],
      city: ['city'],
      province: ['province'],
      type: [''],
      numPharmacist: [''],
      numPharmaTech: [''],
      pms: [''],
      statisticsForm: this.fb.group({
        total_rx_am: [''],
        total_rx_pm: [''],
        total_rx_night: [''],
        total_rx_wk: [''],
        walk_in_ptd_rx_am: [''],
        walk_in_ptd_rx_pm: [''],
        walk_in_ptd_rx_night: [''],
        walk_in_ptd_rx_wk: [''],
        walk_in_hand_rx_am: [''],
        walk_in_hand_rx_pm: [''],
        walk_in_hand_rx_night: [''],
        walk_in_hand_rx_wk: [''],
        faxed_rx_am: [''],
        faxed_rx_pm: [''],
        faxed_rx_night: [''],
        faxed_rx_wk: [''],
        e_rx_am: [''],
        e_rx_pm: [''],
        e_rx_night: [''],
        e_rx_wk: [''],
        phoned_rx_am: [''],
        phoned_rx_pm: [''],
        phoned_rx_night: [''],
        phoned_rx_wk: [''],
        new_patients_am: [''],
        new_patients_pm: [''],
        new_patients_night: [''],
        new_patients_wk: [''],
        avg_time_per_item: ['']
      }),
      transcriptionForm: this.fb.group({
        new_pat_time: [''],
        new_rx_time: [''],
        repeat_rx_time: [''],
        rx_input: ['']
      }),
      reviewForm: this.fb.group({
        review_new_patient: [''],
        review_new_rx: [''],
        review_repeat: [''],
        review_notes: ['']
      }),
      communicationForm: this.fb.group({
        comm_illegible: [''],
        comm_incomplete: [''],
        comm_question: [''],
        comm_advise_change: [''],
        comm_renewal_auth: [''],
        comm_cancellation: [''],
        comm_physician: ['']
      }),
    });
  }

  rebuildForm() {
    this.dispenserForm.patchValue(this.dispenser);
  }

}
