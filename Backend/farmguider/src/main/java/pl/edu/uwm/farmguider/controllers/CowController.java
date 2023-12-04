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
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.edu.uwm.farmguider.exceptions.ErrorResponse;
import pl.edu.uwm.farmguider.facades.CowFacade;
import pl.edu.uwm.farmguider.models.ResponseMessage;
import pl.edu.uwm.farmguider.models.cow.dtos.CowCreateDTO;
import pl.edu.uwm.farmguider.models.cow.dtos.CowResponseDTO;
import pl.edu.uwm.farmguider.models.cow.dtos.CowSearchParams;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cow")
@Tag(name = "Cow Controller", description = "Functionalities intended for cows.")
public class CowController {

    private final CowFacade cowFacade;

    @Operation(summary = "Get cow's data by breeding id",
            description = """
                    Complex rest for searching cows in breeding with the option of filtering and sorting.
                    The following parameters are used for pagination:
                    - page: specifies the page (default 0, minimum value = 0)
                    - size: determines the number of entries on the page (default 25, minimum  = 1, maximum = 100)
                                        
                    Can filter by fields:
                    - earTagNumber: searches for matching earring numbers (no need to enter the entire number)
                    - gender: enter "FEMALE", "MALE" or do not enter this field at all
                    - cowName: searches for matching cow names, case-insensitive (no need to enter the entire name)
                    - minDateOfBirth and maxDateOfBirth: provide a range of animals birth dates (do not have to provide both dates)
                    - minWeight and maxWeight: provide a range of animal weights (do not need to provide both weights)
                    - minMilkingQuantity and maxMilkingQuantity: provide a range of milk quantities from the last milking (do not need to provide both values)
                                        
                    Sorting is done using fields:
                    - sortDesc: sorting direction (ascending by default)
                    - sortBy: field by which cows will be sorted (earTagNumber by default).
                    Can provide the following values: cowName, earTagNumber, dateOfBirth, currentWeight, latestMilkingQuantity, gender
                    """)
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Breeding page retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(
                                    schema = @Schema(implementation = CowResponseDTO.class)
                            )
                    ))
    })
    @GetMapping("/get-cows/{breedingId}")
    public ResponseEntity<Page<CowResponseDTO>> getCowsByBreedingId(@PathVariable Long breedingId,
                                                                    @ModelAttribute @Valid CowSearchParams cowSearchParams) {
        Page<CowResponseDTO> cows = cowFacade.getCowsByBreedingId(breedingId, cowSearchParams);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cows);
    }

    @Operation(summary = "Create cow",
            description = "Creates a cow based on the provided payload")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Successful creation of cow",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CowResponseDTO.class)
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
                    description = "Not Found - breeding not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @PostMapping("/create-cow/{breedingId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenBreedingIdWithContext(#breedingId)")
    public ResponseEntity<CowResponseDTO> createCow(@PathVariable Long breedingId,
                                                    @RequestBody @Valid CowCreateDTO cowCreateDTO) {
        CowResponseDTO cowResponseDTO = cowFacade.createCow(breedingId, cowCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cowResponseDTO);
    }

    @Operation(summary = "Delete cow",
            description = "Deletes cow and all information associated with it")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful deleted cow",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ResponseMessage.class)
                    )),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - entities to delete not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
    })
    @DeleteMapping("/delete/{cowId}")
    @PreAuthorize("@fineGrainedAccessControl.compareGivenCowIdWithContext(#cowId)")
    public ResponseEntity<ResponseMessage> deleteCowById(@PathVariable Long cowId) {
        cowFacade.deleteCowById(cowId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseMessage.builder()
                        .message("Successfully deleted cow")
                        .build());
    }

}
