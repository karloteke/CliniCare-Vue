export interface MedicalRecord {
    id: number;
    createdAt: string;
    doctorName: string;
    treatment: string;
    treatmentCost?: number;
    notes?: string;
    patientDni: string;
}
