import {useState} from 'react';
import {Errors, RegisterValues} from "@/utils/validateRegister.ts";
import {TFunction} from "i18next";

const useValidation = (validateFunction: (values: RegisterValues, t: TFunction) => Errors) => {
    const [errors, setErrors] = useState<Errors>({});

    const validate = (values: RegisterValues, t: TFunction) => {
        const newErrors = validateFunction(values, t);
        setErrors(newErrors);
        return Object.values(newErrors).every(x => x === "" || x === undefined);
    };

    return { errors, validate, setErrors };
};

export default useValidation;