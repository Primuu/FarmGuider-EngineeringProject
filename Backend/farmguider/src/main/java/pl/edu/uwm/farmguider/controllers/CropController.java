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
import pl.edu.uwm.farmguider.facades.CropFacade;
import pl.edu.uwm.farmguider.models.crop.dtos.CropCreateDTO;
import pl.edu.uwm.farmguider.models.crop.dtos.CropResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crop")
@Tag(name = "Crop Controller", description = "Functionalities intended for crop.")
public class CropController {

    private final CropFacade cropFacade;

    @Operation(summary = "Create crop",
            description = "Creates a crop based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of crop",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CropResponseDTO.class)
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
                    description = "Not Found - field not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping("/create-crop/{fieldId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenFieldIdWithContext(#fieldId)")
    public ResponseEntity<CropResponseDTO> createCrop(@PathVariable Long fieldId,
                                                      @RequestBody @Valid CropCreateDTO cropCreateDTO) {
        CropResponseDTO cropResponseDTO = cropFacade.createCrop(fieldId, cropCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cropResponseDTO);
    }

}
