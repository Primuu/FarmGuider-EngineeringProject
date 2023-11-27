package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.exceptions.global.EntityAlreadyExistsException;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.models.user.dtos.UserChangePasswordDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserUpdateDTO;
import pl.edu.uwm.farmguider.services.AddressService;
import pl.edu.uwm.farmguider.services.UserService;

import static pl.edu.uwm.farmguider.models.user.dtos.UserMapper.mapToUserResponseDTO;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserService userService;
    private final AddressService addressService;

    public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
        String email = userCreateDTO.email();
        if (userService.userExistsByEmail(email)) {
            throw new EntityAlreadyExistsException("User", "User with email: " + email + " already exists.");
        }
        Address emptyAddress = addressService.createEmptyAddress();
        return mapToUserResponseDTO(userService.createUser(userCreateDTO, emptyAddress));
    }

    public void changePassword(String email, UserChangePasswordDTO userChangePasswordDTO) {
        userService.changePassword(email, userChangePasswordDTO.currentPassword(), userChangePasswordDTO.newPassword());
    }

    public Long getUserIdByEmail(String email) {
        return userService.getUserByEmail(email).getId();
    }

    public UserResponseDTO getUserById(Long userId) {
        return mapToUserResponseDTO(userService.getUserById(userId));
    }

    public UserResponseDTO updateUserById(Long userId, UserUpdateDTO userUpdateDTO) {
        addressService.updateAddressByUserId(
                userId,
                userUpdateDTO.locality(),
                userUpdateDTO.street(),
                userUpdateDTO.zipCode(),
                userUpdateDTO.propertyNumber()
        );
        User user = userService.updateUserById(userId, userUpdateDTO.firstName(), userUpdateDTO.lastName());
        return mapToUserResponseDTO(user);
    }

}
