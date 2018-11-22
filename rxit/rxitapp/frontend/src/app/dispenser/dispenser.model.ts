//  Specifics of the Dispenser model

export class Dispenser {

    id: number;
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
