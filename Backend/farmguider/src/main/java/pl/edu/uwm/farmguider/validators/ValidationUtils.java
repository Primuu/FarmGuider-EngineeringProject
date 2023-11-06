package pl.edu.uwm.farmguider.validators;

public class ValidationUtils {

    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_=+{}\\[\\]<>?~])" +
            "[A-Za-z\\d!@#$%^&*()-_=+{}\\[\\]<>?~]{8,}$";
    public static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+\\.)+[A-Za-z]{2,}$";
    public static final String NAME_REGEX = "^[\\p{L}-]*$";

}
