package pl.edu.uwm.farmguider.security.filters;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;
import pl.edu.uwm.farmguider.services.SessionService;
import pl.edu.uwm.farmguider.services.UserService;

import java.io.IOException;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.SESSION_COOKIE_NAME;
import static pl.edu.uwm.farmguider.security.utils.CookieUtils.extractCookieFromCookies;
import static pl.edu.uwm.farmguider.security.utils.JWTUtils.extractUsername;
import static pl.edu.uwm.farmguider.security.utils.JWTUtils.isTokenExpired;
import static pl.edu.uwm.farmguider.security.utils.SecurityConstants.*;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final SessionService sessionService;
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith(SWAGGER_URL)
                || path.startsWith(OPEN_API_URL)
                || path.equals(REGISTER_URL)
                || path.equals(AUTHENTICATE_URL);
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String idToken = extractIdToken(request);
        String username = extractUsername(idToken, SECRET_KEY);

        verifyIdToken(response, idToken, username);

        UserDetails userDetails = this.userService.getUserByEmail(username);
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private void verifyIdToken(HttpServletResponse response, String idTokenFromCookie, String username) {
        String idTokenFromDb = userService.getIdTokenByEmail(username);

        if (!idTokenFromDb.equals(idTokenFromCookie)) {
            sessionService.revoke(username);
            throw new UnauthorizedException("IdToken", "User has been logged out for security reasons. " +
                    "IdToken has been tampered with.");
        }

        if (isTokenExpired(idTokenFromDb, SECRET_KEY)) {
            sessionService.renewSession(response, username);
        }
    }

    private String extractIdToken(HttpServletRequest request) {
        try {
            return extractCookieFromCookies(request, SESSION_COOKIE_NAME).getValue();
        } catch (IllegalArgumentException exception) {
            throw new UnauthorizedException("Cookie", exception.getMessage());
        }
    }

}
