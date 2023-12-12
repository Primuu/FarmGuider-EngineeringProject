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
import pl.edu.uwm.farmguider.facades.WeightGainFacade;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainCreateDTO;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weight-gain")
@Tag(name = "Weight gains Controller", description = "Functionalities intended for weight gains.")
public class WeightGainController {

    private final WeightGainFacade weightGainFacade;

    @Operation(summary = "Create weight gain",
            description = "Creates a cow's weight gain based on the provided payload." +
                    "If it's latest weight gain, it also updates data.")
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

    @Operation(summary = "Get weight gain data by id", description = "Retrieves a cow's weight gains list by cow id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Weight gains list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = WeightGainResponseDTO.class)
                            )
                    ))
    })
    @GetMapping("/get-weight-gains/{cowId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCowIdWithContext(#cowId)")
    public ResponseEntity<List<WeightGainResponseDTO>> getWeightGainsByCowId(@PathVariable Long cowId) {
        List<WeightGainResponseDTO> weightGains = weightGainFacade.getWeightGainsByCowId(cowId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(weightGains);
    }

    @Operation(summary = "Update weight gain by id", description = "Updates weight gain data based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Weight gain data updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WeightGainResponseDTO.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - Weight gain not found",
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
    @PutMapping("/update/{weightGainId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenWeightGainIdWithContext(#weightGainId)")
    public ResponseEntity<WeightGainResponseDTO> updateWeightGainById(@PathVariable Long weightGainId,
                                                                      @RequestBody @Valid WeightGainCreateDTO weightGainCreateDTO) {
        WeightGainResponseDTO weightGainResponseDTO = weightGainFacade.updateWeightGainById(weightGainId, weightGainCreateDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(weightGainResponseDTO);
    }

}
