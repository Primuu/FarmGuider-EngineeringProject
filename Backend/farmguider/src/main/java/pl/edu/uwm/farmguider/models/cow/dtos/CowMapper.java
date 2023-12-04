package pl.edu.uwm.farmguider.models.cow.dtos;

import pl.edu.uwm.farmguider.models.cow.Cow;

import java.math.BigDecimal;

public class CowMapper {

    public static CowResponseDTO mapToCowResponseDTO(Cow cow) {
        return CowResponseDTO.builder()
                .cowId(cow.getId())
                .cowName(cow.getCowName())
                .earTagNumber(cow.getEarTagNumber())
                .dateOfBirth(cow.getDateOfBirth())
                .gender(cow.getGender().name())
                .build();
    }

    public static CowPageResponseDTO mapToCowPageResponseDTO(Cow cow,
                                                             BigDecimal currentWeight,
                                                             BigDecimal latestMilkingQuantity) {
        return CowPageResponseDTO.builder()
                .cowId(cow.getId())
                .cowName(cow.getCowName())
                .earTagNumber(cow.getEarTagNumber())
                .dateOfBirth(cow.getDateOfBirth())
                .gender(cow.getGender().name())
                .currentWeight(currentWeight)
                .latestMilkingQuantity(latestMilkingQuantity)
                .build();
    }

}
