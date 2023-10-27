package pl.edu.uwm.farmguider.security.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import pl.edu.uwm.farmguider.exceptions.global.UnauthorizedException;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

public class JWTUtils {

    private final static Integer ONE_HOUR = 3600000;
    private final static Integer SEVEN_DAYS = 86400000 * 7;


    private static Key getSignInKey(String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private static Claims extractAllClaims(String token, String secretKey) {
        try {
            JwtParser parser = Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey(secretKey))
                    .build();

            return parser
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        } catch (Exception exception) {
            throw new UnauthorizedException("JWT", "Unauthorized - JWT has been tampered with.");
        }
    }

    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver, String secretKey) {
        final Claims claims = extractAllClaims(token, secretKey);
        return claimsResolver.apply(claims);
    }

    public static String extractUsername(String token, String secretKey) {
        return extractClaim(token, Claims::getSubject, secretKey);
    }

    private static Date extractExpiration(String token, String secretKey) {
        return extractClaim(token, Claims::getExpiration, secretKey);
    }

    public static String generateToken(UserDetails userDetails, String secretKey) {
        return generateToken(new HashMap<>(), userDetails, secretKey);
    }

    public static String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, String secretKey) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ONE_HOUR))
                .signWith(getSignInKey(secretKey), SignatureAlgorithm.HS256)
                .compact();
    }

    public static String generateRefreshToken(UserDetails userDetails, String secretKey) {
        String refreshTokenID = UUID.randomUUID().toString();
        return Jwts
                .builder()
                .setId(refreshTokenID)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + SEVEN_DAYS))
                .signWith(getSignInKey(secretKey), SignatureAlgorithm.HS256)
                .compact();
    }

    public static boolean isTokenExpired(String token, String secretKey) {
        return extractExpiration(token, secretKey).before(new Date());
    }

}
