package pl.edu.uwm.farmguider.validators.password;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface Password {

    String message() default "Password must contain at least: one lowercase letter, " +
            "one uppercase letter, one special character and one number.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
