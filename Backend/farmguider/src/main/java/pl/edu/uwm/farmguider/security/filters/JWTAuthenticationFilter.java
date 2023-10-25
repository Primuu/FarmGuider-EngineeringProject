package pl.edu.uwm.farmguider.security.filters;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;
import pl.edu.uwm.farmguider.repositories.BlacklistedTokenRepository;
import pl.edu.uwm.farmguider.security.utils.JWTUtils;

import java.io.IOException;

import static pl.edu.uwm.farmguider.controllers.AuthenticationController.AUTHENTICATE_URL;
import static pl.edu.uwm.farmguider.controllers.AuthenticationController.REGISTER_URL;
import static pl.edu.uwm.farmguider.security.utils.CookieUtils.JWT_COOKIE_NAME;
import static pl.edu.uwm.farmguider.security.utils.CookieUtils.extractCookieFromCookies;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final static String SWAGGER_URL = "/swagger-ui/";
    private final static String OPEN_API_URL = "/v3/";
    private final JWTUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final BlacklistedTokenRepository blacklistedTokenRepository;

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
        Cookie jwtCookie;
        try {
            jwtCookie = extractCookieFromCookies(request, JWT_COOKIE_NAME);
        } catch (IllegalArgumentException exception) {
            throw new UnauthorizedException("Cookie", exception.getMessage());
        }

        String jwt = jwtCookie.getValue();
        isTokenBlacklisted(jwt);
        isTokenExpired(jwt);

        String username = jwtUtils.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private void isTokenBlacklisted(String token) {
        if (blacklistedTokenRepository.findByToken(token).isPresent()) {
            throw new UnauthorizedException("JWT", "Token is revoked.");
        }
    }

    private void isTokenExpired(String token) {
//        if (jwtUtils.isTokenExpired(token)) {
//            renewSession();
//        }
        if (jwtUtils.isTokenExpired(token)) {
            throw new UnauthorizedException("JWT", "Token is expired.");
        }
    }

//    private Cookie renewSession(HttpServletResponse response, String email) {
//        String refreshToken = ...;
//
//        String jwt =  authenticationService.renewJWT(refreshToken, email);
//
//        Cookie newJWTCookie = authenticationService.createCookie(email, jwt);
//        response.addCookie(newJWTCookie);
//        return newJWTCookie;
//    }

}
