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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.FarmFacade;
import pl.edu.uwm.farmguider.facades.UserFacade;
import pl.edu.uwm.farmguider.models.ResponseMessage;
import pl.edu.uwm.farmguider.models.user.dtos.UserAuthDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
import pl.edu.uwm.farmguider.security.AuthenticationRequestDTO;
import pl.edu.uwm.farmguider.services.AuthenticationService;
import pl.edu.uwm.farmguider.services.SessionService;

import java.util.Collection;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.*;
import static pl.edu.uwm.farmguider.security.utils.SecurityConstants.AUTHENTICATE_URL;
import static pl.edu.uwm.farmguider.security.utils.SecurityConstants.REGISTER_URL;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "Functionalities intended for registration and login.")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final SessionService sessionService;
    private final UserFacade userFacade;
    private final FarmFacade farmFacade;

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
                            mediaType = "application/json",
                            schema = @Schema(implementation = ResponseMessage.class)
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
    public ResponseEntity<ResponseMessage> authenticate(@RequestBody AuthenticationRequestDTO request) {
        Cookie sessionCookie = authenticationService.authenticate(request.email(), request.password());
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(sessionCookie))
                .body(ResponseMessage.builder()
                        .message("Successfully logged in")
                        .build()
                );
    }

    @Operation(summary = "Logs the User out",
            description = "Logs the User out - delete all tokens from database")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User logged out successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ResponseMessage.class)
                    ))
    })
    @DeleteMapping("/revoke")
    public ResponseEntity<ResponseMessage> revoke() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        sessionService.revoke(email);
        Cookie deletedSessionCookie = createCookie(SESSION_COOKIE_NAME, NULL_COOKIE_VALUE, COOKIE_NULL_AGE, COOKIE_DEFAULT_PATH);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(deletedSessionCookie))
                .body(ResponseMessage.builder()
                        .message("Successfully logged out")
                        .build()
                );
    }

    @Operation(summary = "Get user data", description = "Retrieves basic user data: user id and role")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful retrieve of data",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserAuthDTO.class)
                    ))
    })
    @GetMapping("/auth-data")
    public ResponseEntity<UserAuthDTO> getAuthData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Long userId = userFacade.getUserIdByEmail(authentication.getName());
        Long farmId = farmFacade.getFarmIdByOwnerId(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(UserAuthDTO.builder()
                        .userId(userId)
                        .farmId(farmId)
                        .userRole(authorities.iterator().next().getAuthority())
                        .build()
                );
    }

}