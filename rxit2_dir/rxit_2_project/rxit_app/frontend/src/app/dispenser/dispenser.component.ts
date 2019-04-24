import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ValidateNumber } from '../core/user.service';

import { Dispenser,
    Description,
    Numbers,
    RxStats,
    RxProcess,
    RxReview,
    RxComm } from './dispenser.model';
import { UserHttpService } from '../data/user_http.service';
import { FormBuilder,
      FormGroup,
      FormControl,
      RequiredValidator,
      Validators } from '@angular/forms';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['../core/participant.component.css']
})

export class DispenserComponent implements OnInit {
  @Input() dispenser: Dispenser;
  dispenserSubs: Subscription;
  panelOpenState = false;
  public errors: any = [];

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
    private fb: FormBuilder,
  ) {
    this.createForm();
    console.log('created form ', this.dispenserForm);
  }

  // Form is created when the componenet is constructed.
  createForm() {
    console.log('examining ', this.dispenser);
    this.dispenserForm = this.fb.group({
      pk: [0, ],
      description: this.fb.group({
        pk: [0, ],
        participant_name: [''],
        street: [''],
        city: [''],
        province: [''],
        pharmacy_mgt_system: [''],
      }),
      stats_notes: [''],
      numbers: this.fb.group({
        pk: [0, ],
        num_pharmacists: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
        num_reg_tech: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
        num_unreg: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
        pm_system: ['', ]
      }),

      total_rx: this.makeStatsGroup(),
      walkin_rx: this.makeStatsGroup(),
      faxed_rx: this.makeStatsGroup(),
      phoned_rx: this.makeStatsGroup(),
      e_prescribe_rx: this.makeStatsGroup(),
      new_patients: this.makeStatsGroup(),

      rx_process: this.makeProcessGroup(),

      review_new_pt: this.makeReviewGroup(),
      review_new_rx: this.makeReviewGroup(),
      review_rpt_rx: this.makeReviewGroup(),
      review_notes: [''],

      comm_illegible: this.makeCommGroup(),
      comm_incomplete: this.makeCommGroup(),
      comm_dose: this.makeCommGroup(),
      comm_advise: this.makeCommGroup(),
      comm_renewal: this.makeCommGroup(),
      comm_cancel: this.makeCommGroup(),
      comm_consult: this.makeCommGroup(),
    });
  }

  makeStatsGroup() {
    const statsGroup = this.fb.group({
      pk: [0],
      num_am: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      num_pm: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      num_evng: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      num_wend: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]]
    });
    return statsGroup;
  }

  makeProcessGroup() {
    const processGroup = this.fb.group({
      pk: [0],
      num_new_pt: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      num_new_rx: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      num_rpt_rx: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      pharm_ip: ['false'],
      reg_ip: ['false'],
      unreg_ip: ['false'],
    });
    return processGroup;
  }

  makeReviewGroup() {
    const reviewGroup = this.fb.group({
      pk: [0],
      before_rx: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      after_rx: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      discuss_role: ['AS'],
      review_notes: ['']
    });
    return reviewGroup;
  }

  makeCommGroup() {
    const commGroup = this.fb.group({
      pk: [0],
      daily_duration: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      daily_freq: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      daily_elapsed: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      by_fax: ['false'],
      by_phone: ['false'],
      by_dm: ['false'],
    });
    return commGroup;
  }

  // Form is (re)populated whenever a change happens to the component inputs
  // In this case, the Dispenser instance is the only input
  ngOnInit(): void {
    console.log('ngOnChanges');
    this.rebuildForm();
  }

  // Rebuilding the form uses the current values from the view
  rebuildForm() {
    console.log('building with ', this.dispenser);
    this.dispenserForm.patchValue(this.dispenser);
  }
  // Functions called from the form in the template
  onSubmit() {
    this.dispenser = this.prepareDispenser();
    console.log('Submitting ', this.dispenser);
    this.dispenserService.updateDispenser(
      this.dispenser)
      .subscribe(
        // err => {
        //   this.errors = err['error'];
        //   console.log('Error: ', this.errors);
        // }
        data => {
          console.log('Updaed record: ', data);
        }
      );

      this.dispenserForm.markAsPristine();
  }

  // Preparing the layers of data for submission to the server
  prepareDispenser(): Dispenser {
    // Const containing the form data
    const saveDispenser = this.dispenserForm.value;
    saveDispenser.pk = this.dispenser.pk;

    // Assign each of the groups to the const
    // saveDispenser.description = Object.assign({}, saveDispenser.description);
    // saveDispenser.numbers = Object.assign({}, saveDispenser.numbers);
    console.log('Saving ', saveDispenser);
    // Post the const to the server.
    return saveDispenser;
  }

  // Cancel the changes made in the current sessin
  revert()  {
    console.log('reverting');
    this.rebuildForm();
    this.dispenserForm.markAsPristine();
  }

  // Not sure why we have this...
  goBack(): void {
    this.location.back();
  }

}
