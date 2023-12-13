export default interface LactationPeriodResponseDTO {
    lactationPeriodId: number;
    startDate: Date;
    endDate: Date | null;
}