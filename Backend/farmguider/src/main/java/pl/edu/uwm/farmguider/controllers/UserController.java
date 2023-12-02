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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.UserFacade;
import pl.edu.uwm.farmguider.models.ResponseMessage;
import pl.edu.uwm.farmguider.models.user.dtos.UserChangePasswordDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserPasswordDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserUpdateDTO;

import static pl.edu.uwm.farmguider.security.utils.CookieUtils.*;
import static pl.edu.uwm.farmguider.security.utils.CookieUtils.COOKIE_DEFAULT_PATH;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "User Controller", description = "Functionalities intended for managing the user account.")
public class UserController {

    private final UserFacade userFacade;

    @Operation(summary = "Get user data by id", description = "Retrieves a user's data by their id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User data retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - User not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @GetMapping("/{userId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenUserIdWithContext(#userId)")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userFacade.getUserById(userId));
    }

    @Operation(summary = "Update user by id", description = "Updates user's personal and address data")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User's data updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - User or user's Address not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - returns map of errors",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PutMapping("/update/{userId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenUserIdWithContext(#userId)")
    public ResponseEntity<UserResponseDTO> updateUserById(@PathVariable Long userId, @RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        UserResponseDTO updatedUser = userFacade.updateUserById(userId, userUpdateDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedUser);
    }

    @Operation(summary = "Change password",
            description = "Changes the user's password based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully changed password",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ResponseMessage.class)
                    )),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - returns map of errors",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PatchMapping("/change-password")
    public ResponseEntity<ResponseMessage> changePassword(@RequestBody @Valid UserChangePasswordDTO userChangePasswordDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userFacade.changePassword(email, userChangePasswordDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseMessage.builder()
                        .message("Successfully changed password")
                        .build());
    }

    @Operation(summary = "Delete account",
            description = "Deletes the user account and all information associated with it")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful deleted account",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ResponseMessage.class)
                    )),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - incorrect password",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - entities to delete not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @DeleteMapping("/delete-account")
    public ResponseEntity<ResponseMessage> deleteAccount(@RequestBody UserPasswordDTO userPasswordDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userFacade.deleteAccount(email, userPasswordDTO);
        Cookie deletedSessionCookie = createCookie(SESSION_COOKIE_NAME, NULL_COOKIE_VALUE, COOKIE_NULL_AGE, COOKIE_DEFAULT_PATH);
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, formatCookieHeader(deletedSessionCookie))
                .body(ResponseMessage.builder()
                        .message("Successfully deleted account")
                        .build());
    }

}
