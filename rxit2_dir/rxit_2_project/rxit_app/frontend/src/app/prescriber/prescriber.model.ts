export class Prescriber {

    pk: number;
    // deliver_notes: [''];

    description: DxDescription;

    total_pts: DxStats;
    std_pts: DxStats;
    extend_pts: DxStats;
    ongoing_pts: DxStats;
    total_rx: DxStats;
    new_rx: DxStats;
    renew_rx: DxStats;
    auto_renew_rx: DxStats;
    clarify_msg: DxStats;
    authorize_msg: DxStats;

    printed_rx: DxDelivery;
    faxed_rx: DxDelivery;
    phoned_rx: DxDelivery;
    e_prescribe_rx: DxDelivery;

    receive_msg: DxAdmin;
    process_msg: DxAdmin;

    pat_hx: DxPrep;
    cds: DxPrep;
    p_formulary: DxPrep;
    p_dis: DxPrep;

    drug_name: DxSpec;
    dosage: DxSpec;
    refills: DxSpec;
    route: DxSpec;
    instructions: DxSpec;
}

export class DxDescription {

    pk: 0;
    username: [''];
    participant_name: [''];
    street: [''];
    city: [''];
    province: [''];
    practice_type: [''];
    medical_record_system: [''];
}

export class DxStats {
    pk = 0;
    num_daily = 0;
    num_weekly = 0;
}

export class DxDelivery {
    pk = 0;
    method_del =  false;
    fraction_del = 0;
}

export class DxAdmin {
    pk = 0;
    daily_freq = 0;
    daily_rx_messages = 0;
    pc_urgent_messages = 0;
    total_time_messages = 0;
    comm_role = '';
}
export class DxPrep {
    pk = 0;
    dx_freq = 0;
    dx_duration = 0;
    within_emr = false;
    linked_to_emr = false;
    desktop = false;
    mobile_app = false;
}


export class DxSpec {
    pk = 0;
    spec_duration = 0;
    by_hand = false;
    free_text = false;
    drop_down = false;
    check_box = false;
    search = false;
}
