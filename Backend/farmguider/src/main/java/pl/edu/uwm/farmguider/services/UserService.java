package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;
import pl.edu.uwm.farmguider.models.address.Address;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.repositories.UserRepository;

import static pl.edu.uwm.farmguider.security.utils.SecurityConstants.NULL_TOKEN;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User", "User with id: " + userId + " not found."));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User", "User with email: " + email + " not found."));
    }

    public String getIdTokenByEmail(String email) {
        String idToken = userRepository.findIdTokenByEmail(email);
        if (idToken == null) {
            throw new UnauthorizedException("IdToken", "User is not logged in.");
        }
        return idToken;
    }

    public String getRefreshTokenByEmail(String email) {
        return userRepository.findRefreshTokenByEmail(email);
    }

    public User createUser(UserCreateDTO userCreateDTO, Address address) {
        String encodedPassword = passwordEncoder.encode(userCreateDTO.password());
        User user = new User(
                address,
                userCreateDTO.email(),
                encodedPassword,
                userCreateDTO.firstName(),
                userCreateDTO.lastName(),
                NULL_TOKEN,
                NULL_TOKEN
        );
        return userRepository.saveAndFlush(user);
    }

    public void setTokens(String email, String idToken, String refreshToken) {
        User user = getUserByEmail(email);
        user.setIdToken(idToken);
        user.setRefreshToken(refreshToken);
        userRepository.saveAndFlush(user);
    }

    public void removeTokens(String email) {
        User user = getUserByEmail(email);
        user.setIdToken(null);
        user.setRefreshToken(null);
        userRepository.saveAndFlush(user);
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}
