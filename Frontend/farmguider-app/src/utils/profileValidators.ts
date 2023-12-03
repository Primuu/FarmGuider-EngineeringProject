import {TFunction} from "i18next";

export const NAME_REGEX = /[^\p{L}-]/gu;
export const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@(.+\.)+[A-Za-z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


export type RegisterValues = {
    names: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    confirmPassword: string;
};

export type ProfileValues = {
    firstName: string;
    lastName: string;
    locality: string | null;
    street: string | null;
    zipCode: string | null;
    propertyNumber: string | null;
};

export type ChangePasswordValues = {
    password: string;
    confirmPassword: string;
};

export type RegisterErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export type ProfileErrors = {
    firstName?: string;
    lastName?: string;
    locality?: string;
    street?: string;
    zipCode?: string;
    propertyNumber?: string;
};

export type PasswordErrors = {
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
};

export const validateRegister = (values: RegisterValues, t: TFunction): RegisterErrors => {
    const {names, email, password, confirmPassword} = values;
    const tempErrors: RegisterErrors = {};

    tempErrors.firstName = validateFirstName(names.firstName, t);
    tempErrors.lastName = validateLastName(names.lastName, t);
    tempErrors.email = validateEmail(email, t);
    tempErrors.password = validatePassword(password, t);
    tempErrors.confirmPassword = validateConfirmPassword(password, confirmPassword, t);

    return tempErrors;
};

export const validateProfile = (values: ProfileValues, t: TFunction): ProfileErrors => {
    const {firstName, lastName, locality, street, zipCode, propertyNumber} = values;
    const tempErrors: ProfileErrors = {};

    tempErrors.firstName = validateFirstName(firstName, t);
    tempErrors.lastName = validateLastName(lastName, t);
    tempErrors.locality = validateLocality(locality, t);
    tempErrors.street = validateStreet(street, t);
    tempErrors.zipCode = validateZipCode(zipCode, t);
    tempErrors.propertyNumber = validatePropertyNumber(propertyNumber, t);

    return tempErrors;
};

export const validateChangePassword = (values: ChangePasswordValues, t: TFunction): PasswordErrors => {
    const {password, confirmPassword} = values;
    const tempErrors: PasswordErrors = {};

    tempErrors.password = validatePassword(password, t);
    tempErrors.confirmPassword = validateConfirmPassword(password, confirmPassword, t);

    return tempErrors;
};

export const validateFirstName = (firstName: string, t: TFunction): string => {
    if (!firstName) return t('validation.firstNameFilled');
    if (firstName && firstName.length > 45) return t('validation.firstNameLength');
    return '';
};

export const validateLastName = (lastName: string, t: TFunction): string => {
    if (!lastName) return t('validation.lastNameFilled');
    if (lastName && lastName.length > 45) return t('validation.lastNameLength');
    return '';
};

export const validateEmail = (email: string, t: TFunction): string => {
    if (!email) return t('validation.emailFilled');
    if (!EMAIL_REGEX.test(email)) return t('validation.emailInvalid');
    return '';
};

export const validatePassword = (password: string, t: TFunction): string => {
    if (password.length < 8) return t('validation.passwordLength');
    if (!PASSWORD_REGEX.test(password)) return t('validation.passwordRequirements');
    return '';
};

export const validateConfirmPassword = (password: string, confirmPassword: string, t: TFunction): string => {
    if (password !== confirmPassword) return t('validation.confirmPasswordMismatch');
    return '';
};

export const validateLocality = (locality: string | null, t: TFunction): string => {
    if (locality !== null && locality.length > 45) return t('validation.localityLength');
    return '';
};

export const validateStreet = (street: string | null, t: TFunction): string => {
    if (street !== null && street.length > 45) return t('validation.localityLength');
    return '';
};

export const validateZipCode = (zipCode: string | null, t: TFunction): string => {
    if (zipCode !== null && zipCode.length > 10) return t('validation.zipCodeLength');
    return '';
};

export const validatePropertyNumber = (propertyNumber: string | null, t: TFunction): string => {
    if (propertyNumber !== null && propertyNumber.length > 6) return t('validation.propertyNumberLength');
    return '';
};
