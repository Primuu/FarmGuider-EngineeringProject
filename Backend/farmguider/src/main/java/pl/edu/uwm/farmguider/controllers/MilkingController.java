package pl.edu.uwm.farmguider.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.MilkingFacade;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingCreateDTO;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/milking")
@Tag(name = "Milking Controller", description = "Functionalities intended for milking.")
public class MilkingController {

    private final MilkingFacade milkingFacade;

    @Operation(summary = "Create milking",
            description = "Creates a cow's milking based on the provided payload." +
                    "If it's latest milking, it also updates data. Milking cannot be added to the male.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of milking",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MilkingResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - returns map of errors",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - cow not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping("/create-milking/{cowId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCowIdWithContext(#cowId)")
    public ResponseEntity<MilkingResponseDTO> createMilking(@PathVariable Long cowId,
                                                            @RequestBody @Valid MilkingCreateDTO milkingCreateDTO) {
        MilkingResponseDTO milkingResponseDTO = milkingFacade.createMilking(cowId, milkingCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(milkingResponseDTO);
    }

}
