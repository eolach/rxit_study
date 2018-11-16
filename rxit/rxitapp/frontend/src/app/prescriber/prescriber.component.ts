import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { Prescriber } from './prescriber.model';
import { UserHttpService } from '../data/user_http.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-prescriber',
  templateUrl: './prescriber.component.html',
  styleUrls: ['../core/participant.component.css']
})
export class PrescriberComponent implements OnChanges, OnInit {
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
  }

  // Returns a FormArray in which an array of names is mapped to a set of FormGroups
  private mapToCheckBoxArrayGroup(data: string[]): FormArray {
    return this.fb.array(data.map((i) => {
      // console.log('map i:' + i)
      return this.fb.group({
        name: i,
        selected: true
      });
    }));
  }

  // This returns a form group of the spec_methods array
  getCheckboxFormGroup(methodList: string[]): FormGroup {
    return this.fb.group( {
      size: this.spec_methods.length,
      methods: this.mapToCheckBoxArrayGroup(methodList)
    });
  }

  // Get the arrays that contain the various controls
  get rx_nameArray(): FormArray {
    // console.log(this.prescriberForm.controls.specificationForm)
    // console.log(this.spec_methods)
    return this.prescriberForm.get('specificationForm').get('rx_name').get('methods') as FormArray;
  }

  get dosageArray(): FormArray {
    return this.prescriberForm.get('specificationForm.dosage.methods') as FormArray;
  }

  get refillsArray(): FormArray {
    return this.prescriberForm.get('specificationForm.refills.methods') as FormArray;
  }

  get routeArray(): FormArray {
    return this.prescriberForm.get('specificationForm.route.methods') as FormArray;
  }

  get instructionArray(): FormArray {
    return this.prescriberForm.get('specificationForm.instruction.methods') as FormArray;
  }
  // invoked in constructor
  createForm() {
    this.prescriberForm = this.fb.group({
      participant_name: [''],
      street: [''],
      city: [''],
      province: [''],
      statisticsForm: this.fb.group({
        total_pt_daily: [''],
        total_pt_weekly: [''],
        std_pt_daily: [''],
        std_pt_weekly: [''],
        ext_pt_daily: [''],
        ext_pt_weekly: [''],
        prop_ongoing_daily: [''],
        prop_ongoing_weekly: [''],
      }),
      prescriptionForm: this.fb.group({
        total_rx_daily: [''],
        total_rx_weekly: [''],
        new_rx_daily: [''],
        new_rx_weekly: [''],
        renew_rx_daily: [''],
        renew_rx_weekly: [''],
        multi_rx_daily: [''],
        multi_rx_weekly: ['']
      }),
      communicationForm: this.fb.group({
        auth_rx_daily: [''],
        auth_rx_weekly: [''],
        clarify_rx_daily: [''],
        clarify_rx_weekly: [''],
        request_rx_daily: [''],
        request_rx_weekly: [''],
        other_rx_daily: [''],
        other_rx_weekly: [''],
        other_rx_note: ['']
      }),
      deliveryForm: this.fb.group({
        script: this.getCheckboxFormGroup(this.delivery_methods)
      }),
      adminForm: this.fb.group({
        pharmacy_msgs_freq: [''],
        pharmacy_msgs_role: this.roles,
        pharmacy_msgs_num: [''],
        pharmacy_msgs_percent: [''],
        pharmacy_msgs_time: [''],
        physician_msgs_freq: [''],
        physician_msgs_role: this.roles,
        physician_msgs_num: [''],
        physician_msgs_percent: [''],
        physician_msgs_time: [''],
      }),
      preparationForm: this.fb.group({
        pt_hx_freq: [''],
        pt_hx_time: [''],
        pt_hx: this.getCheckboxFormGroup(this.prep_methods),
        pt_hx_linked_emr: new FormControl(false),
        pt_hx_desktop: new FormControl(false),
        pt_hx_mobile: new FormControl(false),
        cds_hx: this.getCheckboxFormGroup(this.prep_methods),
        cds_hx_time: [''],
        cds_hx_in_emr: new FormControl(false),
        cds_hx_linked_emr: new FormControl(false),
        cds_hx_desktop: new FormControl(false),
        cds_hx_mobile: new FormControl(false),
        frmlry_hx_freq: [''],
        frmlry_hx_time: [''],
        frmlry_hx: this.getCheckboxFormGroup(this.prep_methods),
        dis_hx_freq: [''],
        dis_hx_time: [''],
        dis_hx_: this.getCheckboxFormGroup(this.prep_methods)
      }),
      specificationForm: this.fb.group({
        name_time: '',
        // This is a set of checkboxes. It is a form group with a single element.
        // The single element is an array of checkbox controls.
        // Here the array is called methods in each group.
        // This is the FormArray that the div steps through.
        // The template needs a name for this form array,
        // so that it can access each of the controls in the array
        rx_name: this.getCheckboxFormGroup(this.spec_methods),
        dosage_time: [''],
        dosage: this.getCheckboxFormGroup(this.spec_methods),
        refills_time: [''],
        refills: this.getCheckboxFormGroup(this.spec_methods),
        route_time: [''],
        route: this.getCheckboxFormGroup(this.spec_methods),
        instruction_time: [''],
        instruction: this.getCheckboxFormGroup(this.spec_methods),
      }),
    });
  }

  // invoked when called on initialization

  ngOnInit(): void {
    // this.getPrescriber();
  }

  ngOnChanges(): void {
    this.rebuildForm();
    console.log('rebuilding ', this.prescriber);
  }


  // This takes whatever values are in the template form
  // and adds that back into the form model
  rebuildForm() {
    this.prescriberForm.patchValue(this.prescriber);
    console.log('rebuilding the form');
  }


  // set the prescriber for the first time
/*   setPrescriber(prescriber: Prescriber) {
    this.prescriber = prescriber;
    this.rebuildForm();
  }
 */// Retrieves data from the server side database
  // getPrescriber(): void {
  //   // const id = +this.route.snapshot.paramMap.get('id');
  //   const id = 8;
  //   this.prescriberService.getPrescriber(id)
  //     .subscribe(prescriber => {

  //       console.log('participant is ' + prescriber.name); // do stuff with our data here.
  //       // ....
  //       // asign data to our class property in the end
  //       // so it will be available to our template
  //       this.prescriber = prescriber;
  //   });
  // }

  // Functions called from the form in the template
  onSubmit() {
    this.updatePrescriber();
    this.rebuildForm();
  }


  updatePrescriber(): void {
    // this.prescriberService.updatePrescriber(this.prescriber).subscribe(/* error handling */);
  }

  goBack(): void {
    this.location.back();
  }

}
