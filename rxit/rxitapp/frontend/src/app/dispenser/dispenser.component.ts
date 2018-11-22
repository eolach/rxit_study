import { Component, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { Dispenser, Description, Numbers, RxStats } from './dispenser.model';
import { UserHttpService } from '../data/user_http.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['../core/participant.component.css']
})

export class DispenserComponent implements OnChanges {
  @Input() dispenser: Dispenser;
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
    private fb: FormBuilder,
  ) {
    this.createForm();
    console.log('created form ', this.dispenserForm);
  }

  createForm() {
      console.log('examining ', this.dispenser);    
      this.dispenserForm = this.fb.group({
      description: this.fb.group({
        participant_name: [''],
        street: [''],
        city: [''],
        province: [''],
      }),
      numbers: this.fb.group(new Numbers),

      total_rx: this.fb.group(new RxStats()),
      walk_in_rx: this.fb.group(new RxStats()),
    });
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.rebuildForm();
  }
  // Functions called from the form in the template
  onSubmit() {
    console.log('onSubmit');
    this.updateDispenser();
    this.rebuildForm();
  }

  updateDispenser(): void {
    // this.prescriberService.updatePrescriber(this.prescriber).subscribe(/* error handling */);
  }


  goBack(): void {
    this.location.back();
  }

  rebuildForm() {
    console.log('building with ', this.dispenser);
    this.dispenserForm.patchValue(this.dispenser);
  }

}
