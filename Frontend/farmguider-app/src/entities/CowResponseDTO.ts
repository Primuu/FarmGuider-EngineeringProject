export default interface CowResponseDTO {
    cowId: number;
    cowName: string | null;
    earTagNumber: string;
    dateOfBirth: Date;
    gender: string;
    currentWeight: number;
    latestMilkingQuantity: number;
    latestMilkingDate: Date | null;
    latestWeightMeasurementDate: Date | null;
}