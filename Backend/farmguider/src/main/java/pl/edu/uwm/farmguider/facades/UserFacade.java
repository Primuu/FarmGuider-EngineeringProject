package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.exceptions.global.EntityAlreadyExistsException;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
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

}
