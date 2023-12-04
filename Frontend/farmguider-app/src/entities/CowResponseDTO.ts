export default interface CowResponseDTO {
    cowId: number;
    cowName: string | null;
    earTagNumber: string;
    dateOfBirth: Date;
    gender: string;
    currentWeight: number;
    latestMilkingQuantity: number;
}