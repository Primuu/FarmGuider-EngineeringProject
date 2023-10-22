package pl.edu.uwm.farmguider.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.uwm.farmguider.facades.UserFacade;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "User Controller", description = "Functionalities intended for managing the user account.")
public class UserController {

    private final UserFacade userFacade;

}
