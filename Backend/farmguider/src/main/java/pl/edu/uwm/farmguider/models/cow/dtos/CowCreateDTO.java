package pl.edu.uwm.farmguider.models.cow.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

import static pl.edu.uwm.farmguider.validators.ValidationUtils.EAR_TAG_REGEX;
import static pl.edu.uwm.farmguider.validators.ValidationUtils.NAME_REGEX;

public record CowCreateDTO(@Length(max = 45, message = "Cow name can contain a maximum of 45 characters.")
                           @Pattern(regexp = NAME_REGEX, message = "Cow name must contain only letters.")
                           String cowName,
                           @NotBlank(message = "Ear tag number must be filled in.")
                           @Length(min = 14, max = 14, message = "Ear tag number must contain exactly 14 characters.")
                           @Pattern(regexp = EAR_TAG_REGEX, message = "Ear tag number must contain 12 digits preceded by 2 letters.")
                           String earTagNumber,
                           @NotNull(message = "Birth date field must be filled in.")
                           @PastOrPresent(message = "Date of birth cannot be a future date.")
                           LocalDate dateOfBirth,
                           @NotNull(message = "Gender cannot be empty.")
                           String gender) {
}
