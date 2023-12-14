import {TFunction} from "i18next";

export const EAR_TAG_REGEX = /^[A-Z]{2}\d{12}$/;
export const MINUTES_SECONDS_REGEX = /^\d{0,2}?:?\d{0,2}$/;

export type CowValues = {
    earTagNumber: string | null;
    cowName: string | null;
    dateOfBirth: Date | null;
}

export type MilkingValues = {
    dateOfMilking: Date | null;
    milkQuantity: number | null;
    milkingDuration: string | null;
}

export type WeightGainValues = {
    measurementDate: Date | null;
    weight: number | null;
}

export type CowErrors = {
    earTagNumber?: string;
    cowName?: string;
    dateOfBirth?: string;
    gender?: string;
}

export type MilkingErrors = {
    dateOfMilking?: string;
    milkQuantity?: string;
    milkingDuration?: string;
}

export type WeightingErrors = {
    measurementDate?: string;
    weight?: string;
}

export const validateAddCow = (values: CowValues, t: TFunction): CowErrors => {
    const {earTagNumber, cowName, dateOfBirth} = values;
    const tempErrors: CowErrors = {};

    tempErrors.earTagNumber = validateEarTagNumber(earTagNumber, t);
    tempErrors.cowName = validateCowName(cowName, t);
    tempErrors.dateOfBirth = validateDateOfBirth(dateOfBirth, t);

    return tempErrors;
}

export const validateAddMilking = (values: MilkingValues, t: TFunction): MilkingErrors => {
    const {dateOfMilking, milkQuantity, milkingDuration} = values;
    const tempErrors: MilkingErrors = {};

    tempErrors.dateOfMilking = validateDateOfMilking(dateOfMilking, t);
    tempErrors.milkQuantity = validateMilkQuantity(milkQuantity, t);
    tempErrors.milkingDuration = validateMilkingDuration(milkingDuration, t);

    return tempErrors;
};

export const validateAddWeightGain = (values: WeightGainValues, t: TFunction): WeightingErrors => {
    const {measurementDate, weight} = values;
    const tempErrors: WeightingErrors = {};

    tempErrors.measurementDate = validateMeasurementDate(measurementDate, t);
    tempErrors.weight = validateWeight(weight, t);

    return tempErrors;
}

export const validateCowName = (cowName: string | null, t: TFunction): string => {
    if (cowName && cowName.length > 45) return t('addCowModal.validation.cowNameLength');
    return '';
};

export const validateEarTagNumber = (earTagNumber: string | null, t: TFunction): string => {
    if (!earTagNumber) return t('addCowModal.validation.earTagNumberRequired');
    if (earTagNumber.length !== 14) return t('addCowModal.validation.earTagNumberLength');
    if (!EAR_TAG_REGEX.test(earTagNumber)) return t('addCowModal.validation.earTagNumberPattern');
    return '';
};

export const validateDateOfBirth = (dateOfBirth: Date | null, t: TFunction): string => {
    if (!dateOfBirth) return t('addCowModal.validation.dateOfBirthRequired');
    if (dateOfBirth > new Date()) return t('addCowModal.validation.dateOfBirthPastOrPresent');
    return '';
};

export const validateDateOfMilking = (date: Date | null, t: TFunction): string => {
    if (!date) return t('addMilkingModal.validation.dateOfMilkingRequired');

    const dateWithoutSeconds = new Date(date);
    dateWithoutSeconds.setSeconds(0, 0);

    if (dateWithoutSeconds > new Date()) return t('addMilkingModal.validation.dateOfMilkingPastOrPresent');
    return '';
};

export const validateMilkQuantity = (quantity: number | null, t: TFunction): string => {
    if (quantity === null) return t('addMilkingModal.validation.milkQuantityRequired');
    if (quantity < 0) return t('addMilkingModal.validation.milkQuantityNonNegative');
    if (quantity > 999.999) return t('addMilkingModal.validation.milkQuantityRange');
    return '';
};

export const validateMilkingDuration = (duration: string | null, t: TFunction): string => {
    if (!duration) return '';
    if (!MINUTES_SECONDS_REGEX.test(duration)) return t('addMilkingModal.validation.milkingDurationFormat');
    if (duration) {
        const [minutes, seconds] = duration.split(':').map(Number);
        if (minutes > 59 || seconds > 59) return t('addMilkingModal.validation.milkingDurationRange');
    }
    return '';
};

export const validateMeasurementDate = (measurementDate: Date | null, t: TFunction): string => {
    if (!measurementDate) return t('addWeightGainModal.validation.measurementDateRequired');
    if (measurementDate > new Date()) return t('addWeightGainModal.validation.measurementDatePastOrPresent');
    return '';
};

export const validateWeight = (weight: number | null, t: TFunction): string => {
    if (weight === null) return t('addWeightGainModal.validation.weightRequired');
    if (weight < 0) return t('addWeightGainModal.validation.weightNonNegative');
    if (weight > 9999.999) return t('addWeightGainModal.validation.weightRange');
    return '';
};
