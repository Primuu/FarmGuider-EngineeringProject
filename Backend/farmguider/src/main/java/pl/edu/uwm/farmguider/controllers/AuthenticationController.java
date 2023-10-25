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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.UserFacade;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
import pl.edu.uwm.farmguider.security.AuthenticationRequestDTO;
import pl.edu.uwm.farmguider.services.AuthenticationService;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication Controller",
        description = "Functionalities intended for registration and login.")
public class AuthenticationController {

    public final static String REGISTER_URL = "/register";
    public final static String AUTHENTICATE_URL = "/authenticate";
    private final AuthenticationService authenticationService;
    private final UserFacade userFacade;

    @Operation(summary = "Register (create) User", description = "Creates a user based on the provided payload " +
            "and logs him in - a cookie with a JWT token containing the email address is set")
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
        String token = authenticationService.authenticate(userCreateDTO.email(), userCreateDTO.password());
        Cookie sessionCookie = createCookie(JWT_COOKIE_NAME, token, COOKIE_MAX_AGE_1_DAY, COOKIE_DEFAULT_PATH);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(sessionCookie))
                .body(userResponseDTO);
    }

    @Operation(summary = "Logs the User in", description = "Logs the user in using the given credentials" +
            " - a cookie with a JWT token containing the email address is set")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
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
        String token = authenticationService.authenticate(request.email(), request.password());
        Cookie sessionCookie = createCookie(JWT_COOKIE_NAME, token, COOKIE_MAX_AGE_1_DAY, COOKIE_DEFAULT_PATH);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(sessionCookie))
                .body("Successfully logged in");
    }

//    TODO: revoke?
}