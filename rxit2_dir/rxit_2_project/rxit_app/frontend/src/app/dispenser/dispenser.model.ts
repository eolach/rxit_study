//  Specifics of the Dispenser model

export class Dispenser {

    pk: number;
    description: Description;
    numbers: Numbers;
    total_rx: RxStats;
    walk_in_rx: RxStats;
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

export class TxTime {
    new_patient_time = 0;
    new_rx_time = 0;
    repeat_rx_time = 0;
}

export class TxRole {
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
