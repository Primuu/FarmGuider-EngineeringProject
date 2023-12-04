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
import pl.edu.uwm.farmguider.facades.WeightGainFacade;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainCreateDTO;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weight-gain")
@Tag(name = "Weight gains Controller", description = "Functionalities intended for weight gains.")
public class WeightGainController {

    private final WeightGainFacade weightGainFacade;

    @Operation(summary = "Create weight gain",
            description = "Creates a cow's weight gain based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of weight gain",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WeightGainResponseDTO.class)
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
    @PostMapping("/create-weight-gain/{cowId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCowIdWithContext(#cowId)")
    public ResponseEntity<WeightGainResponseDTO> createWeightGain(@PathVariable Long cowId,
                                                                  @RequestBody @Valid WeightGainCreateDTO weightGainCreateDTO) {
        WeightGainResponseDTO weightGainResponseDTO = weightGainFacade.createWeightGain(cowId, weightGainCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(weightGainResponseDTO);
    }

}
