//  Specifics of the Dispenser model

export class Dispenser {

    pk: number;
    description: Description;
    numbers: Numbers;
    total_rx: RxStats;
    walkin_rx: RxStats;
    faxed_rx: RxStats;
    walk_in_rx: RxStats;
    e_prescribe_rx: RxStats;
    phoned_rx: RxStats;
    rx_process: RxProcess;
    review_new_pt: RxReview;
    review_new_rx: RxReview;
    review_rpt_rx: RxReview;
    comm_illegible: RxComm;
    comm_incomplete: RxComm;
    comm_dose: RxComm;
    comm_advise: RxComm;
    comm_renewal: RxComm;
    comm_cancel: RxComm;
    comm_consult: RxComm;
}

export class Description {
    username: [''];
    participant_name: [''];
    street: [''];
    city: [''];
    province: [''];
    corporate_type: [''];
    pharmacy_mgt_system: [''];
}

export class Numbers {
    num_pharmacists = 0;
    num_reg_tech = 0;
    num_unreg = 0;
}
export class RxStats {
    num_am = 0;
    num_pm  = 0;
    num_evng = 0;
    num_wend = 0;
}

export class RxProcess {
    new_patient_time = 0;
    new_rx_time = 0;
    repeat_rx_time = 0;
    pharmacist = false;
    reg_tech = false;
    unreg = false;
}

export class RxReview {
    discuss_before = 0;
    discuss_after = 0;
    discuss_role = '';
    discuss_notes = '';
}

export class RxComm {
    duration = 0;
    frequency = 0;
    elapsed_time = 0;
    by_fax = false;
    by_phone = false;
    by_dm = false;
}
