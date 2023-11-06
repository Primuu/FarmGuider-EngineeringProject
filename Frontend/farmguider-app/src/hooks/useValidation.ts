import {useState} from 'react';
import {Errors, RegisterValues} from "@/utils/validateRegister.ts";

const useValidation = (validateFunction: (values: RegisterValues) => Errors) => {
    const [errors, setErrors] = useState<Errors>({});

    const validate = (values: RegisterValues) => {
        const newErrors = validateFunction(values);
        setErrors(newErrors);
        return Object.values(newErrors).every(x => x === "" || x === undefined);
    };

    return { errors, validate, setErrors };
};

export default useValidation;