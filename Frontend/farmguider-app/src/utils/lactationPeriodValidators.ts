import {TFunction} from "i18next";

export type LactationPeriodValues = {
    startDate: Date | null;
    endDate: Date | null;
}

export type LactationPeriodErrors = {
    startDate?: string;
    endDate?: string;
}

export const validateLactationPeriod = (values: LactationPeriodValues, t: TFunction): LactationPeriodErrors => {
    const {startDate, endDate} = values;
    const tempErrors: LactationPeriodErrors = {};

    tempErrors.startDate = validateStartDate(startDate, t);
    tempErrors.endDate = validateEndDate(endDate, startDate, t);

    return tempErrors;
}

export const validateStartDate = (startDate: Date | null, t: TFunction): string => {
    if (!startDate) return t('addLactationPeriodModal.validation.startDateRequired');
    if (startDate > new Date()) return t('addLactationPeriodModal.validation.startDatePastOrPresent');
    return '';
};

export const validateEndDate = (endDate: Date | null, startDate: Date | null, t: TFunction): string => {
    if (!endDate) return '';
    if (startDate && (endDate < startDate || endDate.getTime() === startDate.getTime())){
        return t('addLactationPeriodModal.validation.endDateGreater');
    }
    return '';
};