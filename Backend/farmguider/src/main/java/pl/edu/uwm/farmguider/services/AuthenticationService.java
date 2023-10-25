package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;
import pl.edu.uwm.farmguider.models.blacklistedToken.BlacklistedToken;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.repositories.BlacklistedTokenRepository;
import pl.edu.uwm.farmguider.security.utils.JWTUtils;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtService;
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    public String authenticate(String email, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (BadCredentialsException exception) {
            throw new UnauthorizedException("Credentials", "Incorrect email address or password.");
        }
        User user = userService.getUserByEmail(email);
        return jwtService.generateToken(user);
    }

    public void revoke(String token) {
        BlacklistedToken blacklistedToken = new BlacklistedToken(token);
        blacklistedTokenRepository.saveAndFlush(blacklistedToken);
    }

}
