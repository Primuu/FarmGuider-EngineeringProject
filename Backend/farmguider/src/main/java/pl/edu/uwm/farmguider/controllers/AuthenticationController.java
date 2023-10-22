package pl.edu.uwm.farmguider.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.uwm.farmguider.facades.UserFacade;
import pl.edu.uwm.farmguider.models.user.dtos.UserCreateDTO;
import pl.edu.uwm.farmguider.models.user.dtos.UserResponseDTO;
import pl.edu.uwm.farmguider.security.AuthenticationRequestDTO;
import pl.edu.uwm.farmguider.security.services.AuthenticationService;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "Functionalities intended for registration and login")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserFacade userFacade;

    @PostMapping("/register")
//    public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserCreateDTO userCreateDTO) {
    public ResponseEntity<String> register(@RequestBody @Valid UserCreateDTO userCreateDTO) {
        UserResponseDTO userResponseDTO = userFacade.createUser(userCreateDTO);
        String token = authenticationService.authenticate(userCreateDTO.email(), userCreateDTO.password());
//        return new ResponseEntity<>(userResponseDTO, HttpStatus.CREATED);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
//        TODO: set cookie
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequestDTO request) {
        String token = authenticationService.authenticate(request.email(), request.password());
        return new ResponseEntity<>(token, HttpStatus.OK);
        //        TODO: set cookie
    }

//    TODO: revoke?
}