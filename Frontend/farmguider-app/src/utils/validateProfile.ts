import { TFunction } from "i18next";

export type ProfileValues = {
    firstName: string;
    lastName: string;
    locality: string | null;
    street: string | null;
    zipCode: string | null;
    propertyNumber: string | null;
};

export type Errors = {
    firstName?: string;
    lastName?: string;
    locality?: string;
    street?: string;
    zipCode?: string;
    propertyNumber?: string;
};

export const validateProfile = (values: ProfileValues, t: TFunction): Errors => {
    const { firstName, lastName, locality, street, zipCode, propertyNumber } = values;
    const tempErrors: Errors = {};

    tempErrors.firstName = firstName ? '' : t('validation.firstNameFilled');
    if (firstName && firstName.length > 45) {
        tempErrors.firstName = t('validation.firstNameLength');
    }

    tempErrors.lastName = lastName ? '' : t('validation.lastNameFilled');
    if (lastName && lastName.length > 45) {
        tempErrors.lastName = t('validation.lastNameLength');
    }

    if (locality !== null && locality.length > 45) {
        tempErrors.locality = t('validation.localityLength');
    }

    if (street !== null && street.length > 45) {
        tempErrors.street = t('validation.streetLength');
    }

    if (zipCode !== null && zipCode.length > 10) {
        tempErrors.zipCode = t('validation.zipCodeLength');
    }

    if (propertyNumber !== null && propertyNumber.length > 6) {
        tempErrors.propertyNumber = t('validation.propertyNumberLength');
    }

    return tempErrors;
};
