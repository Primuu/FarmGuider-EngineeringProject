package pl.edu.uwm.farmguider.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
import pl.edu.uwm.farmguider.facades.LactationPeriodFacade;
import pl.edu.uwm.farmguider.models.lactationPeriod.dtos.LactationPeriodCreateDTO;
import pl.edu.uwm.farmguider.models.lactationPeriod.dtos.LactationPeriodResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lactation-period")
@Tag(name = "Lactation Period Controller", description = "Functionalities intended for lactation periods.")
public class LactationPeriodController {

    private final LactationPeriodFacade lactationPeriodFacade;

    @Operation(summary = "Create lactation period",
            description = "Creates a cow's lactation period based on the provided payload." +
                    "Lactation periods must not conflict with each other.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of lactation period",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LactationPeriodResponseDTO.class)
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
    @PostMapping("/create-lactation-period/{cowId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCowIdWithContext(#cowId)")
    public ResponseEntity<LactationPeriodResponseDTO> createLactationPeriod(@PathVariable Long cowId,
                                                                            @RequestBody @Valid LactationPeriodCreateDTO lactationPeriodCreateDTO) {
        LactationPeriodResponseDTO lactationPeriodResponseDTO = lactationPeriodFacade.createLactationPeriod(cowId, lactationPeriodCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(lactationPeriodResponseDTO);
    }

    @Operation(summary = "Get lactation period data by id",
            description = "Retrieves a cow's lactation periods list by cow id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lactation periods list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = LactationPeriodResponseDTO.class)
                            )
                    ))
    })
    @GetMapping("/get-lactation-periods/{cowId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCowIdWithContext(#cowId)")
    public ResponseEntity<List<LactationPeriodResponseDTO>> getLactationPeriodsByCowId(@PathVariable Long cowId) {
        List<LactationPeriodResponseDTO> lactationPeriods = lactationPeriodFacade.getLactationPeriodsByCowId(cowId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lactationPeriods);
    }

    @Operation(summary = "Update lactation period by id",
            description = "Updates lactation period data based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lactation Period data updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LactationPeriodResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Lactation Period not found",
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
    @PutMapping("/update/{lactationPeriodId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenLactationPeriodIdWithContext(#lactationPeriodId)")
    public ResponseEntity<LactationPeriodResponseDTO> updateLactationPeriodById(@PathVariable Long lactationPeriodId,
                                                                                @RequestBody @Valid LactationPeriodCreateDTO lactationPeriodCreateDTO) {
        LactationPeriodResponseDTO lactationPeriodResponseDTO = lactationPeriodFacade.updateLactationPeriodById(lactationPeriodId, lactationPeriodCreateDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lactationPeriodResponseDTO);
    }

}
