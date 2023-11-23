import { TFunction } from "i18next";

export const nameRegex = /[^\p{L}-]/gu;
const emailRegex = /^[A-Za-z0-9+_.-]+@(.+\.)+[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{}[\]<>?~])[A-Za-z\d!@#$%^&*()-_=+{}[\]<>?~]{8,}$/;

export type RegisterValues = {
    names: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    confirmPassword: string;
};

export type Errors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export const validateRegister = (values: RegisterValues, t: TFunction): Errors => {
    const {names, email, password, confirmPassword} = values;
    const tempErrors: Errors = {};

    tempErrors.firstName = names.firstName ? '' : t('validation.firstNameFilled');
    if (names.firstName && names.firstName.length > 45) {
        tempErrors.firstName = t('validation.firstNameLength');
    }

    tempErrors.lastName = names.lastName ? '' : t('validation.lastNameFilled');
    if (names.lastName && names.lastName.length > 45) {
        tempErrors.lastName = t('validation.lastNameLength');
    }

    if (!email) {
        tempErrors.email = t('validation.emailFilled');
    } else if (!emailRegex.test(email)) {
        tempErrors.email = t('validation.emailInvalid');
    } else {
        tempErrors.email = '';
    }

    tempErrors.password = password.length >= 8 ? '' : t('validation.passwordLength');
    if (!passwordRegex.test(password)) {
        tempErrors.password = t('validation.passwordRequirements');
    }

    tempErrors.confirmPassword = password === confirmPassword ? '' : t('validation.confirmPasswordMismatch');

    if (password !== confirmPassword) {
        tempErrors.password = tempErrors.password || t('validation.confirmPasswordMismatch');
    }

    return tempErrors;
};