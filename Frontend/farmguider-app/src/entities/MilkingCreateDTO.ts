export default interface MilkingCreateDTO {
    dateOfMilking: Date;
    milkQuantity: number;
    milkingDuration: number | null;
}