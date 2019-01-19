//  Specifics of the Dispenser model

export class Dispenser {

    pk: number;
    description: Description;
    numbers: Numbers;
    stats_notes: string;
    review_notes: string;

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

    pk: 0;
    username: [''];
    participant_name: [''];
    street: [''];
    city: [''];
    province: [''];
    corporate_type: [''];
    pharmacy_mgt_system: [''];
}

export class Numbers {
    pk = 0;
    num_pharmacists = 0;
    num_reg_tech = 0;
    num_unreg = 0;
}
export class RxStats {
    pk = 0;
    num_am = 0;
    num_pm  = 0;
    num_evng = 0;
    num_wend = 0;
}

export class RxProcess {
    pk = 0;
    num_new_pt = 0;
    num_new_rx = 0;
    num_rpt_rx = 0;
    pharm_ip = false;
    reg_ip = false;
    unreg_ip = false;
}

export class RxReview {
    pk = 0;
    before_rx = 0;
    after_rx = 0;
    discuss_role = 'AS';
    review_notes = '';
}

export class RxComm {
    pk = 0;
    daily_duration = 0;
    daily_freq = 0;
    daily_elapsed = 0;
    by_fax = false;
    by_phone = false;
    by_dm = false;
}
