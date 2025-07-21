export interface Prescription {
    id: number;
    patientId: number;
    drugName: string;
    dosage: string;
    datePrescribed: string;
}

export interface CreatePrescriptionRequest {
    patientId: number;
    drugName: string;
    dosage: string;
    datePrescribed?: string;
}