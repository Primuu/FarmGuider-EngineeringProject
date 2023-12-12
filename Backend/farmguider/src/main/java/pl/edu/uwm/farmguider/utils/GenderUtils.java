package pl.edu.uwm.farmguider.utils;

import pl.edu.uwm.farmguider.exceptions.cow.InvalidGenderException;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;

public class GenderUtils {

    public static void verifyIsFemale(Gender gender) {
        if (!gender.equals(Gender.FEMALE)) {
            throw new InvalidGenderException("Gender", "Gender of this animal does not allow this operation to be performed.");
        }
    }

}
