package pl.edu.uwm.farmguider.models.user.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import static pl.edu.uwm.farmguider.validators.ValidationUtils.NAME_REGEX;

public record UserUpdateDTO(@NotBlank(message = "First name must be filled in.")
                            @Length(min = 1, max = 45, message = "First name can contain a maximum of 45 characters.")
                            @Pattern(regexp = NAME_REGEX, message = "First name must contain only letters.")
                            String firstName,
                            @NotBlank(message = "Last name must be filled in.")
                            @Length(min = 1, max = 45, message = "Last name can contain a maximum of 45 characters.")
                            @Pattern(regexp = NAME_REGEX, message = "Last name must contain only letters.")
                            String lastName,
                            @Length(max = 45, message = "Locality can contain a maximum of 45 characters.")
                            String locality,
                            @Length(max = 45, message = "Locality can contain a maximum of 45 characters.")
                            String street,
                            @Length(max = 10, message = "Locality can contain a maximum of 10 characters.")
                            String zipCode,
                            @Length(max = 6, message = "Locality can contain a maximum of 6 characters.")
                            String propertyNumber) {
}
