export interface TreatmentCreateDTO {
    treatmentName: string;
    treatmentDate: Date;
    quantity: number;
    details: string | null;
}