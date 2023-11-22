package pl.edu.uwm.farmguider.models.user.dtos;

import pl.edu.uwm.farmguider.models.user.User;

public class UserMapper {

    public static UserResponseDTO mapToUserResponseDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .locality(user.getAddress().getLocality())
                .street(user.getAddress().getStreet())
                .zipCode(user.getAddress().getZipCode())
                .propertyNumber(user.getAddress().getPropertyNumber())
                .build();
    }

}
