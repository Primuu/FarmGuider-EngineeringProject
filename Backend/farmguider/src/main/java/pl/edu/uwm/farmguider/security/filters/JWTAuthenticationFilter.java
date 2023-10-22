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
import pl.edu.uwm.farmguider.exceptions.global.JWTCookieNotFoundException;
import pl.edu.uwm.farmguider.security.utils.JWTUtils;

import java.io.IOException;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.JWT_COOKIE_NAME;
import static pl.edu.uwm.farmguider.security.utils.CookieUtils.extractCookieFromCookies;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtils jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/swagger-ui/")
                || path.startsWith("/v3/")
                || path.equals("/authenticate")
                || path.equals("/register");
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
//        final String authHeader = request.getHeader("Authorization");
//        final String jwt;
//        final String username;
//
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        jwt = authHeader.substring(7);
//        username = jwtService.extractUsername(jwt);
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//            if (jwtService.isTokenValid(jwt, userDetails)) {
//                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                        userDetails,
//                        null,
//                        userDetails.getAuthorities()
//                );
//                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//            }
//        }
//        filterChain.doFilter(request, response);


        Cookie jwtCookie;
        try {
            jwtCookie = extractCookieFromCookies(request, JWT_COOKIE_NAME);
        } catch (IllegalArgumentException ex) {
            throw new JWTCookieNotFoundException(ex.getMessage());
        }

        String jwt = jwtCookie.toString();

        if (jwt == null || jwt.trim().isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
//        TODO: sprawdzenie czy prawidłowym jwt

        String username = jwtService.extractUsername(jwt);
        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        if (!jwtService.isTokenValid(jwt, userDetails)) {
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

//    private void verifyToken(HttpServletResponse response, String token, String email) {
//        if (isTokenExpired(idTokenFromDb)) {
//            Cookie newPayloadCookie = renewSession(response, email);
//            token = newPayloadCookie.getValue();
//            idTokenFromDb = JWT.decode(userRepository.findIdTokenByEmail(email));
//        }
//
//        if (!idTokenFromDb.getPayload().equals(token)) {
//            authenticationService.revoke(email);
//            throw new UnauthorizedException("Id Token", "User has been logged out for security reasons. " +
//                    "Id Token has been tampered with.");
//        }
//    }

//    private Cookie renewSession(HttpServletResponse response, String email) {
//        String refreshToken = userRepository.findRefreshTokenByEmail(email);
//
//        GoogleTokenResponse tokenResponse = authenticationService.renewTokens(refreshToken, email);
//
//        Cookie newPayloadCookie = authenticationService.setupSession(email, tokenResponse);
//        response.addCookie(newPayloadCookie);
//        return newPayloadCookie;
//    }

}
