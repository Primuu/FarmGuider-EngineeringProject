import {TFunction} from "i18next";

export type FieldValues = {
    fieldName: string | null;
    fieldArea: number | null;
}

export type FieldErrors = {
    fieldName?: string;
    fieldArea?: string;
    soilClass?: string;
}

export const validateAddField = (values: FieldValues, t: TFunction): FieldErrors => {
    const {fieldName, fieldArea} = values;
    const tempErrors: FieldErrors = {};

    tempErrors.fieldName = validateFieldName(fieldName, t);
    tempErrors.fieldArea = validateFieldArea(fieldArea, t);

    return tempErrors;
}

export const validateFieldName = (fieldName: string | null, t: TFunction): string => {
    if (!fieldName) return t('addFieldModal.validation.fieldNameRequired');
    if (fieldName.length > 45 || fieldName.length < 3) return t('addFieldModal.validation.fieldNameLength');
    return '';
};

export const validateFieldArea = (fieldArea: number | null, t: TFunction): string => {
    if (fieldArea === null) return t('addFieldModal.validation.fieldAreaRequired');
    if (fieldArea < 0) return t('addFieldModal.validation.fieldAreaNonNegative');
    if (fieldArea > 999.99) return t('addFieldModal.validation.fieldAreaRange');
    return '';
};
