package pl.edu.uwm.farmguider.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.FarmFacade;
import pl.edu.uwm.farmguider.models.farm.dtos.CowSummaryDTO;
import pl.edu.uwm.farmguider.models.farm.dtos.FieldSummaryDTO;
import pl.edu.uwm.farmguider.models.farm.dtos.MilkingSummaryDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/farm")
@Tag(name = "Farm Controller", description = "Functionalities intended for farm.")
public class FarmController {

    private final FarmFacade farmFacade;

    @Operation(summary = "Get farm cows summary", description = "Retrieves the daily cows summary by farm id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Summary retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CowSummaryDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Farm not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
    })
    @GetMapping("/get-cows-summary/{farmId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFarmIdWithContext(#farmId)")
    public ResponseEntity<CowSummaryDTO> getCowSummary(@PathVariable Long farmId) {
        CowSummaryDTO cowSummaryDTO = farmFacade.getCowSummary(farmId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cowSummaryDTO);
    }

    @Operation(summary = "Get milking summary", description = "Retrieves the daily milking summary by farm id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Summary retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MilkingSummaryDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Farm not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
    })
    @GetMapping("/get-milking-summary/{farmId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFarmIdWithContext(#farmId)")
    public ResponseEntity<MilkingSummaryDTO> getMilkingSummary(@PathVariable Long farmId) {
        MilkingSummaryDTO milkingSummaryDTO = farmFacade.getMilkingSummary(farmId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(milkingSummaryDTO);
    }

    @Operation(summary = "Get field summary", description = "Retrieves the field summary by farm id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Summary retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = FieldSummaryDTO.class)
                            )
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Farm not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
    })
    @GetMapping("/get-fields-summary/{farmId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFarmIdWithContext(#farmId)")
    public ResponseEntity<List<FieldSummaryDTO>> getFieldSummary(@PathVariable Long farmId) {
        List<FieldSummaryDTO> fieldSummaries = farmFacade.getFieldSummary(farmId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(fieldSummaries);
    }

}
