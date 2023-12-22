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
import pl.edu.uwm.farmguider.facades.FieldFacade;
import pl.edu.uwm.farmguider.models.field.dtos.FieldCreateDTO;
import pl.edu.uwm.farmguider.models.field.dtos.FieldResponseDTO;
import pl.edu.uwm.farmguider.models.field.dtos.FieldSearchParams;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/field")
@Tag(name = "Field Controller", description = "Functionalities intended for field.")
public class FieldController {

    private final FieldFacade fieldFacade;

    @Operation(summary = "Create field",
            description = "Creates a field based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of field",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = FieldResponseDTO.class)
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
    @PostMapping("/create-field/{farmId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFarmIdWithContext(#farmId)")
    public ResponseEntity<FieldResponseDTO> createField(@PathVariable Long farmId,
                                                        @RequestBody @Valid FieldCreateDTO fieldCreateDTO) {
        FieldResponseDTO fieldResponseDTO = fieldFacade.createField(farmId, fieldCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(fieldResponseDTO);
    }

    @Operation(summary = "Get field's data by farm id",
            description = """
                    Complex rest for searching fields with the option of filtering.
                    Can filter by fields:
                    - fieldName: searches for matching field names, case-insensitive (no need to enter the entire name)
                    - soilClass: enter "I", "II", "IIIa", "IIIb", "IVa", "IVb", "V" or do not enter this field at all
                    - fieldAreaFrom and fieldAreaTo: provide a range of field areas (do not need to provide both values)
                    """)
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Field list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = FieldResponseDTO.class)
                            )
                    ))
    })
    @GetMapping("/get-fields/{farmId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFarmIdWithContext(#farmId)")
    public ResponseEntity<List<FieldResponseDTO>> getFieldsByFarmId(@PathVariable Long farmId,
                                                                    @ModelAttribute @Valid FieldSearchParams fieldSearchParams) {
        List<FieldResponseDTO> fields = fieldFacade.getFieldsByFarmId(farmId, fieldSearchParams);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(fields);
    }

    @Operation(summary = "Get field data by id", description = "Retrieves a field data by id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Field data retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = FieldResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Field not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @GetMapping("/{fieldId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFieldIdWithContext(#fieldId)")
    public ResponseEntity<FieldResponseDTO> getFieldById(@PathVariable Long fieldId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(fieldFacade.getFieldById(fieldId));
    }

}
