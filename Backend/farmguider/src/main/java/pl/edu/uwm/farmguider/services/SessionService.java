package pl.edu.uwm.farmguider.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.*;
import static pl.edu.uwm.farmguider.security.utils.JWTUtils.*;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final UserService userService;
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;

    public Cookie setupSession(String email) {
        UserDetails user = userService.getUserByEmail(email);
        String newIdToken = generateToken(user, SECRET_KEY);
        String newRefreshToken = generateRefreshToken(user, SECRET_KEY);

        userService.setTokens(email, newIdToken, newRefreshToken);
        return createCookie(SESSION_COOKIE_NAME, newIdToken, COOKIE_MAX_AGE_1_DAY, COOKIE_DEFAULT_PATH);
    }

    public void revoke(String email) {
        userService.removeTokens(email);
    }

    public void renewSession(HttpServletResponse response, String username) {
        String refreshToken = userService.getRefreshTokenByEmail(username);

        if (refreshToken == null ||
                isTokenExpired(refreshToken, SECRET_KEY) ||
                !isUserTokenOwner(refreshToken, username)) {
            revoke(username);
            throw new UnauthorizedException("RefreshToken", "User has been logged out for security reasons" +
                    " - Refresh token is invalid or expired.");
        }

        Cookie newSessionCookie = setupSession(username);
        response.addCookie(newSessionCookie);
    }

    private boolean isUserTokenOwner(String token, String username) {
        return extractUsername(token, SECRET_KEY).equals(username);
    }

}
