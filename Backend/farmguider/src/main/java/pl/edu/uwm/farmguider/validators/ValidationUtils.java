package pl.edu.uwm.farmguider.validators;

public class ValidationUtils {

    public static final String PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
    public static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+\\.)+[A-Za-z]{2,}$";
    public static final String NAME_REGEX = "^[\\p{L}-]*$";
    public static final String EAR_TAG_REGEX = "^[A-Z]{2}\\d{12}$";

}
