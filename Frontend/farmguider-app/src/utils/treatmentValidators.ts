import {TFunction} from "i18next";

export type TreatmentValues = {
    treatmentName: string | null;
    treatmentDate: Date | null;
    quantity: number | null;
    details: string | null;
}

export type TreatmentErrors = {
    treatmentName?: string;
    treatmentDate?: string;
    quantity?: string;
    details?: string;
}

export const validateAddTreatment = (values: TreatmentValues, t: TFunction): TreatmentErrors => {
    const {treatmentName, quantity, treatmentDate, details} = values;
    const tempErrors: TreatmentErrors = {};

    tempErrors.treatmentName = validateTreatmentName(treatmentName, t);
    tempErrors.treatmentDate = validateTreatmentDate(treatmentDate, t);
    tempErrors.quantity = validateQuantity(quantity, t);
    tempErrors.details = validateDetails(details, t);

    return tempErrors;
}

export const validateTreatmentName = (treatmentName: string | null, t: TFunction): string => {
    if (!treatmentName) return t('addTreatmentModal.validation.treatmentNameRequired');
    if (treatmentName.length > 45 || treatmentName.length < 3) return t('addTreatmentModal.validation.treatmentNameLength');
    return '';
};

export const validateTreatmentDate = (treatmentDate: Date | null, t: TFunction): string => {
    if (!treatmentDate) return t('addTreatmentModal.validation.treatmentDateRequired');
    if (treatmentDate > new Date()) return t('addTreatmentModal.validation.treatmentDatePastOrPresent');
    return '';
};

export const validateQuantity = (quantity: number | null, t: TFunction): string => {
    if (quantity === null) return t('addTreatmentModal.validation.quantityRequired');
    if (quantity < 0) return t('addTreatmentModal.validation.quantityNonNegative');
    if (quantity > 99999999.99) return t('addTreatmentModal.validation.quantityRange');
    return '';
};

export const validateDetails = (details: string | null, t: TFunction): string => {
    if (details && details.length > 255) return t('addTreatmentModal.validation.detailsLength');
    return '';
};
