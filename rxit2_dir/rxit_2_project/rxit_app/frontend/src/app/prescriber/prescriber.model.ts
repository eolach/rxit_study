export class Prescriber {

    pk: 0;
    username: [''];
    deliver_notes: [''];

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

    participant_name: [''];
    street: [''];
    city: [''];
    province: [''];
    practice_type: [''];
    medical_record_system: [''];
    num_physicians: 0;
}

export class DxStats {
    num_daily: 0;
    num_weeky: 0;
}

export class DxDelivery {
    method_del: false;
    num_weekly: 0;
}

export class DxAdmin {
    daily_freq: 0;
    daily_rx_messages: 0;
    pc_urgent_messages: 0;
    total_time_messages: 0;
    comm_role:'';
}
export class DxPrep {
    dx_freq: 0;
    dx_duration: 0;
    within_emr: false;
    linked_to_emr: false;
    desktop: false;
    mobile_app: false;
}


export class DxSpec {
    spec_duration: 0;
    by_hand: false;
    free_text: false;
    drop_down: false;
    check_box: false;
    search: false;
}
