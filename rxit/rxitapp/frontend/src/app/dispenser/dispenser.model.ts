//  Specifics of the Dispenser model

export class Dispenser {
    constructor(
        public name: string,
        public street: string,
        public city: string,
        public province: string,
        public id: number,
        public type: string,
        public numPharmacist: number,
        public numPharmaTech: number,
        public pms: string,
        public statistics?: DispenserStatistics,
        public transcription?: DispenserTranscription,
        public review?: DispenserReview,
        public communication?: DispenserCommunication
    ) {}
}

export class DispenserStatistics {
    constructor(
        public total_rx: number[],
        public walk_in_ptd_rx: number[],
        public walk_in_hand_rx: number[],
        public faxed_rx: number[],
        public e_rx: number[],
        public phoned_rx: number[],
        public new_patients: number[],
        public avg_time_per_item: number
    ) {}
}

export class DispenserTranscription {
    constructor(
        public new_pat_time: number,
        public new_rx_time: number,
        public repeat_rx_time: number,
        public rx_input: number[]
    ) {}
}

export class DispenserReview {
    constructor(
        public review_new_patient: number[],
        public review_new_rx: number[],
        public review_repeat: number[],
        public review_notes: ''
        ) {}
}

export class DispenserCommunication {
    constructor(
        public comm_illegible: number[],
        public comm_incomplete: number[],
        public comm_question: number[],
        public comm_advise_change: number[],
        public comm_renewal_auth: number[],
        public comm_cancellation: number[],
        public comm_physician: number[],
        ) {}
}
