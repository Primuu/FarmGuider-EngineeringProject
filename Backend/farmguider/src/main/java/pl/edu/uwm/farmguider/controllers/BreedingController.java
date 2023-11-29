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
import org.springframework.web.bind.annotation.*;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.BreedingFacade;
import pl.edu.uwm.farmguider.models.breeding.dtos.BreedingCreateDTO;
import pl.edu.uwm.farmguider.models.breeding.dtos.BreedingResponseDTO;


@RestController
@RequiredArgsConstructor
@RequestMapping("/breeding")
@Tag(name = "Breeding Controller", description = "Functionalities intended for breeding.")
public class BreedingController {

    private final BreedingFacade breedingFacade;

    @Operation(summary = "Create breeding",
            description = "Creates a breeding based on the provided payload ")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of breeding",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = BreedingResponseDTO.class)
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
                    description = "Not Found - farm not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping("/create-breeding/{farmId}")
    public ResponseEntity<BreedingResponseDTO> createBreeding(@PathVariable Long farmId,
                                                              @RequestBody @Valid BreedingCreateDTO breedingCreateDTO) {
        BreedingResponseDTO breedingResponseDTO = breedingFacade.createBreeding(farmId, breedingCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(breedingResponseDTO);
    }

}
