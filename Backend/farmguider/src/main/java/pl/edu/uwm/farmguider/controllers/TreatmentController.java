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
import pl.edu.uwm.farmguider.facades.TreatmentFacade;
import pl.edu.uwm.farmguider.models.ResponseMessage;
import pl.edu.uwm.farmguider.models.treatment.dtos.TreatmentCreateDTO;
import pl.edu.uwm.farmguider.models.treatment.dtos.TreatmentResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/treatment")
@Tag(name = "Treatment Controller", description = "Functionalities intended for treatment.")
public class TreatmentController {

    private final TreatmentFacade treatmentFacade;

    @Operation(summary = "Create treatment",
            description = "Creates a treatment based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of treatment",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TreatmentResponseDTO.class)
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
                    description = "Not Found - crop not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping("/create-treatment/{cropId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCropIdWithContext(#cropId)")
    public ResponseEntity<TreatmentResponseDTO> createTreatment(@PathVariable Long cropId,
                                                                @RequestBody @Valid TreatmentCreateDTO treatmentCreateDTO) {
        TreatmentResponseDTO treatmentResponseDTO = treatmentFacade.createTreatment(cropId, treatmentCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(treatmentResponseDTO);
    }

    @Operation(summary = "Get treatments data by id", description = "Retrieves a crop treatments list by crop id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Treatments list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = TreatmentResponseDTO.class)
                            )
                    ))
    })
    @GetMapping("/get-treatments/{cropId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCropIdWithContext(#cropId)")
    public ResponseEntity<List<TreatmentResponseDTO>> getTreatmentsByCropId(@PathVariable Long cropId) {
        List<TreatmentResponseDTO> treatments = treatmentFacade.getTreatmentsByCropId(cropId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(treatments);
    }

    @Operation(summary = "Update treatment by id", description = "Updates treatment data based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Treatment data updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TreatmentResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Treatment not found",
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
    @PutMapping("/update/{treatmentId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenTreatmentIdWithContext(#treatmentId)")
    public ResponseEntity<TreatmentResponseDTO> updateTreatmentById(@PathVariable Long treatmentId,
                                                                    @RequestBody @Valid TreatmentCreateDTO treatmentCreateDTO) {
        TreatmentResponseDTO treatmentResponseDTO = treatmentFacade.updateTreatmentById(treatmentId, treatmentCreateDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(treatmentResponseDTO);
    }

    @Operation(summary = "Delete treatment", description = "Deletes treatment by id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful deleted treatment",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ResponseMessage.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - entity to delete not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @DeleteMapping("/delete/{treatmentId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenTreatmentIdWithContext(#treatmentId)")
    public ResponseEntity<ResponseMessage> deleteTreatmentById(@PathVariable Long treatmentId) {
        treatmentFacade.deleteTreatmentById(treatmentId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseMessage.builder()
                        .message("Successfully deleted treatment")
                        .build());
    }

}
