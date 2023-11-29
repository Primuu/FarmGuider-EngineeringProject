package pl.edu.uwm.farmguider.models.breeding.dtos;

import org.hibernate.validator.constraints.Length;

public record BreedingCreateDTO(@Length(min = 3, max = 45, message = "Breeding name must be between" +
                                                                                " 3 and  45 characters.")
                                String breedingName) {
}
