import { Component, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

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

export class DispenserComponent implements OnChanges {
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
        num_pharmacists: [0, ],
        num_reg_tech: [0, Validators.required],
        num_unreg: [0, Validators.required],
        pm_system: ['', Validators.required]
      }),

      total_rx: this.fb.group(new RxStats()),
      walkin_rx: this.fb.group(new RxStats()),
      faxed_rx: this.fb.group(new RxStats()),
      phoned_rx: this.fb.group(new RxStats()),
      e_prescribe_rx: this.fb.group(new RxStats()),
      new_patients: this.fb.group(new RxStats()),

      rx_process: this.fb.group(new RxProcess()),

      review_new_pt: this.fb.group(new RxReview()),
      review_new_rx: this.fb.group(new RxReview()),
      review_rpt_rx: this.fb.group(new RxReview()),
      review_notes: [''],

      comm_illegible: this.fb.group(new RxComm()),
      comm_incomplete: this.fb.group(new RxComm()),
      comm_dose: this.fb.group(new RxComm()),
      comm_advise: this.fb.group(new RxComm()),
      comm_renewal: this.fb.group(new RxComm()),
      comm_cancel: this.fb.group(new RxComm()),
      comm_consult: this.fb.group(new RxComm()),
    });
  }

  // Form is (re)populated whenever a change happens to the component inputs
  // In this case, the Dispenser instance is the only input
  ngOnChanges(): void {
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
        err => {
          this.errors = err['error'];
          console.log('Error: ', this.errors);
        }
      );
    // this.rebuildForm();
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
  }

  // Not sure why we have this...
  goBack(): void {
    this.location.back();
  }

}
