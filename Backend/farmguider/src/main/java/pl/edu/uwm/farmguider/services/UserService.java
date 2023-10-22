package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User", "User with email: " + email + " not found."));
    }

    public User createUser(UserCreateDTO userCreateDTO, Address address) {
        String encodedPassword = passwordEncoder.encode(userCreateDTO.password());
        User user = new User(
                address,
                userCreateDTO.email(),
                encodedPassword,
                userCreateDTO.firstName(),
                userCreateDTO.lastName()
        );
        return userRepository.saveAndFlush(user);
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}
