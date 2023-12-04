export default interface CowSearchParams {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDesc?: boolean;
    earTagNumber?: string;
    gender?: string;
    cowName?: string;
    minDateOfBirth?: Date;
    maxDateOfBirth?: Date;
    minWeight?: number;
    maxWeight?: number;
    minMilkingQuantity?: number;
    maxMilkingQuantity?: number;
}