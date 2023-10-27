package pl.edu.uwm.farmguider.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.UserFacade;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
import pl.edu.uwm.farmguider.security.AuthenticationRequestDTO;
import pl.edu.uwm.farmguider.services.AuthenticationService;
import pl.edu.uwm.farmguider.services.SessionService;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.*;
import static pl.edu.uwm.farmguider.security.utils.SecurityConstants.AUTHENTICATE_URL;
import static pl.edu.uwm.farmguider.security.utils.SecurityConstants.REGISTER_URL;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication Controller",
        description = "Functionalities intended for registration and login.")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final SessionService sessionService;
    private final UserFacade userFacade;

    @Operation(summary = "Register (create) User",
            description = "Creates a user based on the provided payload " +
                    "and logs him in - a cookie with a idToken (jwt) containing the email address is set")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of user",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - returns map of errors",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping(REGISTER_URL)
    public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserCreateDTO userCreateDTO) {
        UserResponseDTO userResponseDTO = userFacade.createUser(userCreateDTO);
        Cookie sessionCookie = authenticationService.authenticate(userCreateDTO.email(), userCreateDTO.password());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(sessionCookie))
                .body(userResponseDTO);
    }

    @Operation(summary = "Logs the User in",
            description = "Logs the user in using the given credentials" +
                    " - a cookie with a idToken (jwt) containing the email address is set")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User logged in successfully",
                    content = @Content(
                            mediaType = "text/plain",
                            schema = @Schema(implementation = String.class)
                    )),
            @ApiResponse(
                    responseCode = "401",
                    description = "Bad Request - returns map of errors",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping(AUTHENTICATE_URL)
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequestDTO request) {
        Cookie sessionCookie = authenticationService.authenticate(request.email(), request.password());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(sessionCookie))
                .body("Successfully logged in");
    }

    @Operation(summary = "Logs the User out",
            description = "Logs the User out - delete all tokens from database")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User logged out successfully",
                    content = @Content(
                            mediaType = "text/plain",
                            schema = @Schema(implementation = String.class)
                    ))
    })
    @GetMapping("/revoke")
    public ResponseEntity<String> revoke() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        sessionService.revoke(email);
        Cookie deletedSessionCookie = createCookie(SESSION_COOKIE_NAME, null, COOKIE_NULL_AGE, COOKIE_DEFAULT_PATH);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(deletedSessionCookie))
                .body("Successfully logged out");
    }

}