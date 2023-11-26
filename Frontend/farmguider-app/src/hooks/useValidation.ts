import React, {useState} from 'react';
import {TFunction} from "i18next";

type Errors = {
    [key: string]: string | undefined;
};

const useValidation = <T>(validateFunction: (values: T, t: TFunction) => Errors):
    {errors: Errors, validate: (values: T, t: TFunction) => boolean, setErrors: React.Dispatch<React.SetStateAction<Errors>>} => {
    const [errors, setErrors] = useState<Errors>({});

    const validate = (values: T, t: TFunction) => {
        const newErrors = validateFunction(values, t);
        setErrors(newErrors);
        return Object.values(newErrors).every(x => x === "" || x === undefined);
    };

    return {errors, validate, setErrors};
};

export default useValidation;