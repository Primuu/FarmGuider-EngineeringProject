export default interface MilkingResponseDTO {
    milkingId: number;
    dateOfMilking: Date;
    milkQuantity: number;
    milkingDuration: number | null;
}