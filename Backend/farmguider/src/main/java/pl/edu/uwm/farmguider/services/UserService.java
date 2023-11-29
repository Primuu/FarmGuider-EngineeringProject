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

    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = getUserByEmail(email);
        verifyPassword(currentPassword, user.getPassword());

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.saveAndFlush(user);
    }

    public void deleteAccount(String email, String password) {
        User user = getUserByEmail(email);
        verifyPassword(password, user.getPassword());

        userRepository.delete(user);
    }

    private void verifyPassword(String givenPassword, String currentPassword) {
        if(!passwordEncoder.matches(givenPassword, currentPassword)) {
            throw new UnauthorizedException("Password", "Incorrect password");
        }
    }

    public User updateUserById(Long userId, String firstName, String lastName) {
        User user = getUserById(userId);
        user.setFirstName(firstName);
        user.setLastName(lastName);
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
