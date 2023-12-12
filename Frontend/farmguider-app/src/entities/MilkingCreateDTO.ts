export default interface MilkingCreateDTO {
    dateOfMilking: string;
    milkQuantity: number;
    milkingDuration: number | null;
}