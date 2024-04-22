export interface Appointment {
    id: number;
    createdAt: string;
    area: string;
    medicalName: string;
    date: string;
    time: string;
    isUrgent: boolean;
    patientDni: string;
}
