import {TFunction} from "i18next";

export const validateBreedingName = (breedingName: string, t: TFunction): string => {
    if (!breedingName) return t('addHerdModal.validation');
    if (breedingName && breedingName.length < 3) return t('addHerdModal.validationLength3');
    if (breedingName && breedingName.length > 45) return t('addHerdModal.validationLength45');
    return '';
};
