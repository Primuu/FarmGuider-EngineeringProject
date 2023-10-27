package pl.edu.uwm.farmguider.services;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final SessionService sessionService;
    private final AuthenticationManager authenticationManager;

    public Cookie authenticate(String email, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (BadCredentialsException exception) {
            throw new UnauthorizedException("Credentials", "Incorrect email address or password.");
        }
        return sessionService.setupSession(email);
    }

}
