import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs/Subscription";
import { ValidateNumber } from '../core/user.service';

import {
  Prescriber,
  DxDescription,
  DxStats,
  DxDelivery,
  DxAdmin,
  DxPrep,
  DxSpec
} from "./prescriber.model";

import { UserHttpService } from "../data/user_http.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

export interface Role {
  value: string;
  viewValue: string;
}



@Component({
  selector: "app-prescriber",
  templateUrl: "./prescriber.component.html",
  styleUrls: ["../core/participant.component.css"]
})
export class PrescriberComponent implements OnInit {
  public spec_methods = [
    "by hand",
    "free text",
    "dropdown menu",
    "check box",
    "search"
  ];
  public prep_methods = [
    "in EMR",
    "in linked EMR",
    "on desktop app",
    "on mobile app"
  ];
  public delivery_methods = [
    "handed to patient",
    "phoned to dispenser",
    "faxed to dispenser",
    "registered on PrescribeIT"
  ];

  @Input() prescriber: Prescriber;
  panelOpenState = false;

  prescriberForm: FormGroup;

  prescriberSubs: Subscription;
  roles: Role[] = [
    { value: "MD", viewValue: "Physician" },
    { value: "RN", viewValue: "Nurse" },
    { value: "AS", viewValue: "Assistant" },
    { value: "AD", viewValue: "Office mgr" },
    { value: "OT", viewValue: "Other" }
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
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // invoked in constructor
  createForm() {
    console.log("creating form ");
    this.prescriberForm = this.fb.group({
      pk: [0],
      description: this.fb.group({
        pk: [0],
        participant_name: [""],
        street: [""],
        city: [""],
        province: [""],
        practice_type: [""],
        medical_record_system: [""],
        num_physicians: [0, [Validators.required, Validators.minLength(1)]]
      }),
      total_pts: this.makeStatsGroup(),
      std_pts: this.makeStatsGroup(),
      extend_pts: this.makeStatsGroup(),
      ongoing_pts: this.makeStatsGroup(),
      total_rx: this.makeStatsGroup(),
      new_rx: this.makeStatsGroup(),
      renew_rx: this.makeStatsGroup(),
      auto_renew_rx: this.makeStatsGroup(),
      poly_rx: this.makeStatsGroup(),
      clarify_msg: this.makeStatsGroup(),
      authorize_msg: this.makeStatsGroup(),

      printed_rx: this.makeDeliveryGroup(),
      faxed_rx: this.makeDeliveryGroup(),
      phoned_rx: this.makeDeliveryGroup(),
      e_prescribe_rx: this.makeDeliveryGroup(),

      receive_msg: this.makeAdminGroup(),
      process_msg: this.makeAdminGroup(),

      pat_hx: this.makePrepGroup(),
      cds: this.makePrepGroup(),
      p_formulary: this.makePrepGroup(),
      p_dis: this.makePrepGroup(),

      drug_name: this.makeSpecGroup(),
      dosage: this.makeSpecGroup(),
      refills: this.makeSpecGroup(),
      route: this.makeSpecGroup(),
      instructions: this.makeSpecGroup(),
    });
    console.log("created form ", this.prescriberForm);
  }

  makeStatsGroup() {
    const statsGroup = this.fb.group({
      pk: [0],
      num_daily: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]],
      num_weekly: [0, [Validators.required, ValidateNumber, Validators.min(0), Validators.minLength(1)]]
    });
    return statsGroup;
  }

  makeDeliveryGroup() {
    const deliveryGroup = this.fb.group({
      pk: [0],
      method_del: [false],
      fraction_del: [0, [Validators.required, Validators.minLength(1)]]
    });
    return deliveryGroup;
  }

  makeAdminGroup() {
    const adminGroup = this.fb.group({
      pk: [0],
      daily_freq: [0, [Validators.required, Validators.minLength(1)]],
      daily_rx_messages: [0, [Validators.required, Validators.minLength(1)]],
      pc_urgent_messages: [0, [Validators.required, Validators.minLength(1)]],
      total_time_messages: [0, [Validators.required, Validators.minLength(1)]],
      comm_role: [""]
    });
    return adminGroup;
  }

  makePrepGroup() {
    const prepGroup = this.fb.group({
      pk: [0],
      method_del: [false],
      dx_freq: [0, [Validators.required, Validators.minLength(1)]],
      dx_duration: [0, [Validators.required, Validators.minLength(1)]],
      within_emr: [false],
      linked_to_emr: [false],
      desktop: [false],
      mobile_app: [false]
    });
    return prepGroup;
  }

  makeSpecGroup() {
    const specGroup = this.fb.group({
      pk: [0],
      spec_duration: [0, [Validators.required, Validators.minLength(1)]],
      by_hand: [false],
      free_text: [false],
      drop_down: [false],
      check_box: [false],
      search: [false]
    });
    return specGroup;
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.rebuildForm();
  }

  // This takes whatever values are in the template form
  // and adds that back into the form model
  rebuildForm() {
    console.log("rebuilding with ", this.prescriber.description);
    this.prescriberForm.patchValue(this.prescriber);
  }

  // Functions called from the form in the template
  onSubmit() {
    this.prescriber = this.preparePrescriber();
    console.log("Submitting ", this.prescriber);
    this.prescriberService.updatePrescriber(this.prescriber).subscribe(err => {
      this.errors = err["error"];
      console.log("Error: ", this.errors);
    });
    this.prescriberForm.markAsPristine();
  }

  preparePrescriber(): Prescriber {
    // Const containing the form data
    const savePrescriber = this.prescriberForm.value;
    savePrescriber.pk = this.prescriber.pk;

    // Assign each of the groups to the const
    // saveDispenser.description = Object.assign({}, saveDispenser.description);
    // saveDispenser.numbers = Object.assign({}, saveDispenser.numbers);
    console.log("Saving ", savePrescriber);
    // Post the const to the server.
    return savePrescriber;
  }

  revert() {
    console.log("reverting");
    this.rebuildForm();
    this.prescriberForm.markAsPristine();
  }

  goBack(): void {
    this.location.back();
  }
}
