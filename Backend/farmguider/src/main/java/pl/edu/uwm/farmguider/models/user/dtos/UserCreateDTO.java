package pl.edu.uwm.farmguider.models.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;
import jakarta.validation.constraints.Pattern;
import pl.edu.uwm.farmguider.validators.password.Password;

import static pl.edu.uwm.farmguider.validators.ValidationUtils.EMAIL_REGEX;
import static pl.edu.uwm.farmguider.validators.ValidationUtils.NAME_REGEX;

public record UserCreateDTO(@NotBlank(message = "Email must be filled in.")
                            @Email(regexp = EMAIL_REGEX, message = "Invalid email format.")
                            String email,
                            @NotBlank(message = "Password must be filled in.")
                            @Length(message = "Password must contain at least 8 characters.")
                            @Password
                            String password,
                            @NotBlank(message = "First name must be filled in.")
                            @Length(min = 1, max = 45, message = "First name can contain a maximum of 45 characters.")
                            @Pattern(regexp = NAME_REGEX, message = "First name must contain only letters.")
                            String firstName,
                            @NotBlank(message = "Last name must be filled in.")
                            @Length(min = 1, max = 45, message = "Last name can contain a maximum of 45 characters.")
                            @Pattern(regexp = NAME_REGEX, message = "Last name must contain only letters.")
                            String lastName) {
}
