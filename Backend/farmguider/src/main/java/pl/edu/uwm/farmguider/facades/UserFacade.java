package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.exceptions.global.EntityAlreadyExistsException;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.models.user.dtos.*;
import pl.edu.uwm.farmguider.services.AddressService;
import pl.edu.uwm.farmguider.services.FarmService;
import pl.edu.uwm.farmguider.services.UserService;

import static pl.edu.uwm.farmguider.models.user.dtos.UserMapper.mapToUserResponseDTO;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserService userService;
    private final AddressService addressService;
    private final FarmService farmService;

    public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
        String email = userCreateDTO.email();
        if (userService.userExistsByEmail(email)) {
            throw new EntityAlreadyExistsException("User", "User with email: " + email + " already exists.");
        }
        Address emptyAddress = addressService.createEmptyAddress();
        User user = userService.createUser(userCreateDTO, emptyAddress);
        farmService.createFarm(user);
        return mapToUserResponseDTO(user);
    }

    public void changePassword(String email, UserChangePasswordDTO userChangePasswordDTO) {
        userService.changePassword(email, userChangePasswordDTO.currentPassword(), userChangePasswordDTO.newPassword());
    }

    public void deleteAccount(String email, UserPasswordDTO userPasswordDTO) {
        userService.deleteAccount(email, userPasswordDTO.password());
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
