import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { Prescriber,
  DxDescription,
  DxStats,
  DxDelivery,
  DxAdmin,
  DxPrep,
  DxSpec} from './prescriber.model';
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
      username: [''],
      descriptionForm: this.fb.group(new DxDescription()),
      statisticsForm: this.fb.group(new DxStats()),
      deliveryForm: this.fb.group(new DxDelivery()),
      adminForm: this.fb.group(new DxAdmin()),
      preparationForm: this.fb.group(new DxPrep()),
      specificationForm: this.fb.group(new DxSpec()),
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
