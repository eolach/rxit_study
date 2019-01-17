import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import {
  Prescriber,
  DxDescription,
  DxStats,
  DxDelivery,
  DxAdmin,
  DxPrep,
  DxSpec
} from './prescriber.model';
import { UserHttpService } from '../data/user_http.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-prescriber',
  templateUrl: './prescriber.component.html',
  styleUrls: ['../core/participant.component.css']
})
export class PrescriberComponent implements OnChanges {
  public spec_methods = ['by hand', 'free text', 'dropdown menu', 'checm box', 'search'];
  public prep_methods = ['in EMR', 'in linked EMR', 'on desktop app', 'on mobile app'];
  public delivery_methods = ['handed to patient', 'phoned to dispenser', 'faxed to dispenser', 'registered on PrescribeIT'];

  @Input() prescriber: Prescriber;
  panelOpenState = false;

  prescriberForm: FormGroup;

  prescriberSubs: Subscription;
  roles: Role[] = [
    { value: 'physician', viewValue: 'Physician' },
    { value: 'assistant', viewValue: 'Assistant' },
    { value: 'other', viewValue: 'Other' }
  ];


  public errors: any = [];


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
    private prescriberService: UserHttpService,
    private location: Location,
    private fb: FormBuilder,

  ) {
    this.createForm();
    console.log('created form ', this.prescriberForm);
  }


  // invoked in constructor
  createForm() {
    console.log('creating form ');
    this.prescriberForm = this.fb.group({
      pk: [0, ],
      description: this.fb.group({
        pk: [0, ],
        participant_name: [''],
        street: [''],
        city: [''],
        province: [''],
        practice_type: [''],
        medical_record_system: [''],
        num_physicians: [0, ],
      }),
      total_pts: this.fb.group(new DxStats()),
      std_pts: this.fb.group(new DxStats()),
      extend_pts: this.fb.group(new DxStats()),
      ongoing_pts: this.fb.group(new DxStats()),
      total_rx: this.fb.group(new DxStats()),
      new_rx: this.fb.group(new DxStats()),
      renew_rx: this.fb.group(new DxStats()),
      auto_renew_rx: this.fb.group(new DxStats()),
      poly_rx: this.fb.group(new DxStats()),
      clarify_msg: this.fb.group(new DxStats()),
      authorize_msg: this.fb.group(new DxStats()),

      printed_rx: this.fb.group(new DxDelivery()),
      faxed_rx: this.fb.group(new DxDelivery()),
      phoned_rx: this.fb.group(new DxDelivery()),
      e_prescribe_rx: this.fb.group(new DxDelivery()),

      receive_msg: this.fb.group(new DxAdmin()),
      process_msg: this.fb.group(new DxAdmin()),

      pat_hx: this.fb.group(new DxPrep()),
      cds: this.fb.group(new DxPrep()),
      p_formulary: this.fb.group(new DxPrep()),
      p_dis: this.fb.group(new DxPrep()),

      drug_name: this.fb.group(new DxSpec()),
      dosage: this.fb.group(new DxSpec()),
      refills: this.fb.group(new DxSpec()),
      route: this.fb.group(new DxSpec()),
      instructions: this.fb.group(new DxSpec()),
    });
  }

  // invoked when called on initialization


  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.rebuildForm();
  }


  // This takes whatever values are in the template form
  // and adds that back into the form model
  rebuildForm() {
    console.log('rebuilding with ', this.prescriber);
    this.prescriberForm.patchValue(this.prescriber);
  }

  // Functions called from the form in the template
  onSubmit() {
    this.prescriber = this.preparePrescriber();
    console.log('Submitting ', this.prescriber);
    this.prescriberService.updatePrescriber(
      this.prescriber)
      .subscribe(
        err => {
          this.errors = err['error'];
          console.log('Error: ', this.errors);
        }
      );
    // this.rebuildForm();
  }

  preparePrescriber(): Prescriber {
    // Const containing the form data
    const savePrescriber = this.prescriberForm.value;
    savePrescriber.pk = this.prescriber.pk;

    // Assign each of the groups to the const
    // saveDispenser.description = Object.assign({}, saveDispenser.description);
    // saveDispenser.numbers = Object.assign({}, saveDispenser.numbers);
    console.log('Saving ', savePrescriber);
    // Post the const to the server.
    return savePrescriber;
  }

  revert() {
    console.log('reverting');
    this.rebuildForm();
  }

  goBack(): void {
    this.location.back();
  }

}
