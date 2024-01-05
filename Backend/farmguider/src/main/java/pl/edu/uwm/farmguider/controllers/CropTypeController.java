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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.uwm.farmguider.facades.CropTypeFacade;
import pl.edu.uwm.farmguider.models.cropType.dtos.CropTypeResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crop-type")
@Tag(name = "Crop Type Controller", description = "Functionalities intended for crop types.")
public class CropTypeController {

    private final CropTypeFacade cropTypeFacade;

    @Operation(summary = "Get all crop types", description = "Retrieves all crop types data")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Crop types list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = CropTypeResponseDTO.class)
                            )
                    ))
    })
    @GetMapping("/get-crop-types")
    public ResponseEntity<List<CropTypeResponseDTO>> getCropTypes() {
        List<CropTypeResponseDTO> cropTypes = cropTypeFacade.getCropTypes();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cropTypes);
    }

}
