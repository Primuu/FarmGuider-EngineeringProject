package pl.edu.uwm.farmguider.models.user.dtos;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;
import pl.edu.uwm.farmguider.validators.password.Password;

public record UserChangePasswordDTO(String currentPassword,
                                    @NotBlank(message = "Password must be filled in.")
                                    @Length(message = "Password must contain at least 8 characters.")
                                    @Password
                                    String newPassword) {
}
