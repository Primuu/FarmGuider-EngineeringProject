import {TFunction} from "i18next";

export const EAR_TAG_REGEX = /^[A-Z]{2}\d{12}$/;

export type CowValues = {
    earTagNumber: string | null;
    cowName: string | null;
}

export type CowErrors = {
    earTagNumber?: string;
    cowName?: string;
}

export const validateAddCow = (values: CowValues, t: TFunction): CowErrors => {
    const {earTagNumber, cowName} = values;
    const tempErrors: CowErrors = {};

    tempErrors.earTagNumber = validateEarTagNumber(earTagNumber, t);
    tempErrors.cowName = validateCowName(cowName, t);

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
