export default interface CropResponseDTO {
    cropId: number;
    cropType: string;
    sowingDate: Date;
    harvestDate: Date | null;
    expectedHarvestStartDate: Date;
    expectedHarvestEndDate: Date;
    yield: number | null;
    expectedYield: number;
}