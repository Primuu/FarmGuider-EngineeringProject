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
import pl.edu.uwm.farmguider.facades.FieldFacade;
import pl.edu.uwm.farmguider.models.field.dtos.FieldCreateDTO;
import pl.edu.uwm.farmguider.models.field.dtos.FieldResponseDTO;

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

}
