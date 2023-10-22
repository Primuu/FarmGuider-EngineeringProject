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

    private final AuthenticationService authenticationService;
    private final UserFacade userFacade;

    @Operation(summary = "Register (create) User", description = "Creates a user from the provided payload")
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
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserCreateDTO userCreateDTO) {
        UserResponseDTO userResponseDTO = userFacade.createUser(userCreateDTO);
        String token = authenticationService.authenticate(userCreateDTO.email(), userCreateDTO.password());
        Cookie sessionCookie = createCookie(JWT_COOKIE_NAME, token, COOKIE_MAX_AGE_1_DAY, COOKIE_DEFAULT_PATH);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(sessionCookie))
                .body(userResponseDTO);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequestDTO request) {
        String token = authenticationService.authenticate(request.email(), request.password());
        return new ResponseEntity<>(token, HttpStatus.OK);
        //        TODO: set cookie
    }

//    TODO: revoke?
}