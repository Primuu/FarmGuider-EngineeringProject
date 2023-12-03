import {TFunction} from "i18next";

export const EAR_TAG_REGEX = /^[A-Z]{2}\d{12}$/;

export type CowValues = {
    earTagNumber: string | null;
    cowName: string | null;
    dateOfBirth: Date | null;
}

export type CowErrors = {
    earTagNumber?: string;
    cowName?: string;
    dateOfBirth?: string;
}

export const validateAddCow = (values: CowValues, t: TFunction): CowErrors => {
    const {earTagNumber, cowName, dateOfBirth} = values;
    const tempErrors: CowErrors = {};

    tempErrors.earTagNumber = validateEarTagNumber(earTagNumber, t);
    tempErrors.cowName = validateCowName(cowName, t);
    tempErrors.dateOfBirth = validateDateOfBirth(dateOfBirth, t);

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
