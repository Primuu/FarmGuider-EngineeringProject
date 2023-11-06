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

export const validateRegister = (values: RegisterValues): Errors => {
    const {names, email, password, confirmPassword} = values;
    const tempErrors: Errors = {};

    tempErrors.firstName = names.firstName ? '' : 'First name must be filled in.';
    if (names.firstName && names.firstName.length > 45) {
        tempErrors.firstName = 'First name can contain a maximum of 45 characters.';
    }

    tempErrors.lastName = names.lastName ? '' : 'Last name must be filled in.';
    if (names.lastName && names.lastName.length > 45) {
        tempErrors.lastName = 'Last name can contain a maximum of 45 characters.';
    }

    if (!email) {
        tempErrors.email = 'Email must be filled in.';
    } else if (!emailRegex.test(email)) {
        tempErrors.email = 'Invalid email format.';
    } else {
        tempErrors.email = '';
    }

    tempErrors.password = password.length >= 8 ? '' : 'Password must contain at least 8 characters.';
    if (!passwordRegex.test(password)) {
        tempErrors.password = 'Password must meet the complexity requirements.';
    }

    tempErrors.confirmPassword = password === confirmPassword ? '' : 'Passwords do not match.';

    if (password !== confirmPassword) {
        tempErrors.password = tempErrors.password || 'Passwords do not match.';
    }

    return tempErrors;
};