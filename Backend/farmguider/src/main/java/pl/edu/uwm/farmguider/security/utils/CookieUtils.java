package pl.edu.uwm.farmguider.security.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class CookieUtils {

    public static final String JWT_COOKIE_NAME = "JWT";
    public static final String COOKIE_DEFAULT_PATH = "/";
    public static final Integer COOKIE_MAX_AGE_1_DAY = 24 * 60 * 60;

    public static String formatCookieHeader(Cookie cookie) {
        return cookie.getName() + "=" + cookie.getValue() + "; Path=" + cookie.getPath() + "; Max-Age=" + cookie.getMaxAge();
    }

    public static Cookie createCookie(String name, String value, Integer maxAge, String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath(path);
        return cookie;
    }

    public static Cookie extractCookieFromCookies(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie;
                }
            }
        }
        throw new IllegalArgumentException("Cookie with name: " + name + " not found.");
    }

}
