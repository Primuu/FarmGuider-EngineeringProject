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
import pl.edu.uwm.farmguider.facades.CowFacade;
import pl.edu.uwm.farmguider.models.cow.dtos.CowCreateDTO;
import pl.edu.uwm.farmguider.models.cow.dtos.CowResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cow")
@Tag(name = "Cow Controller", description = "Functionalities intended for cows.")
public class CowController {

    private final CowFacade cowFacade;

    @Operation(summary = "Create cow",
            description = "Creates a cow based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of cow",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CowResponseDTO.class)
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
                    description = "Not Found - breeding not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping("/create-cow/{breedingId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenBreedingIdWithContext(#breedingId)")
    public ResponseEntity<CowResponseDTO> createCow(@PathVariable Long breedingId,
                                                    @RequestBody @Valid CowCreateDTO cowCreateDTO) {
        CowResponseDTO cowResponseDTO = cowFacade.createCow(breedingId, cowCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cowResponseDTO);
    }

}
