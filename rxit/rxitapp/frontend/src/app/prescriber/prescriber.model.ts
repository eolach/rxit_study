export class Prescriber {
    constructor(
        public name: string,
        public street: string,
        public city: string,
        public province: string,
        public id: number,
        public statistics?: PrescriberStatistics,
        public prescription?: PrescriberPrescription,
        public communication?: PrescriberCommunication,
        public delivery?: PrescriberDelivery,
        public admin?: PrescriberAdmin,
        public prepration?: PrescriberPreperation,
        public specification?: PrescriberSpecification
    ) {}
}

export class PrescriberStatistics {
    constructor (
        public total_pt_daily: '',
        public total_pt_weekly: '',
        public std_pt_daily: '',
        public std_pt_weekly: '',
        public ext_pt_daily: '',
        public ext_pt_weekly: '',
        public prop_ongoing_daily: '',
        public prop_ongoing_weekly: ''
    ) {}
}

export class PrescriberPrescription {
    constructor (
        public total_rx_daily: '',
        public total_rx_weekly: '',
        public new_rx_daily: '',
        public new_rx_weekly: '',
        public renew_rx_daily: '',
        public renew_rx_weekly: '',
        public multi_rx_daily: '',
        public multi_rx_weekly: '',
        ) {}
}

export class PrescriberCommunication {
    constructor (
        public auth_rx_daily: '',
        public auth_rx_weekly: '',
        public clarify_rx_daily: '',
        public clarify_rx_weekly: '',
        public request_rx_daily: '',
        public request_rx_weekly: '',
        public other_rx_daily: '',
        public other_rx_weekly: '',
        public other_rx_note: ''
    ) {}
}

export class PrescriberDelivery {
    constructor (
        public delivery: boolean[]
    ) {}
}

export class PrescriberAdmin {
    constructor (
        public pharmacy_msgs_freq: '',
        public pharmacy_msgs_role: '',
        public pharmacy_msgs_num: '',
        public pharmacy_msgs_percent: '',
        public pharmacy_msgs_time: '',
        public physician_msgs_freq: '',
        public physician_msgs_role: '',
        public physician_msgs_num: '',
        public physician_msgs_percent: '',
        public physician_msgs_time: ''
    ) {}
}
export class PrescriberPreperation {
    constructor (
        public pt_hx_freq: '',
        public pt_hx_time: '',
        public pt_hx: boolean[],
        public cds_hx_freq: '',
        public cds_hx_time: '',
        public cds_hx_: boolean[],
        public frmlry_hx_freq: '',
        public frmlry_hx_time: '',
        public frmlry_hx_: boolean[],
        public dis_hx_freq: '',
        public dis_hx_time: '',
        public dis_hx: boolean[],
    ) {}
}


export class PrescriberSpecification {
    constructor (
        public rx_name: boolean[],
        public dosage: boolean[],
        public refilols: boolean[],
        public route: boolean[],
        public instruction: boolean[],

    ) {}
}