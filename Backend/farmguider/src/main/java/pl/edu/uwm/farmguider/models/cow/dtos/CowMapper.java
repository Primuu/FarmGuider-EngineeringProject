package pl.edu.uwm.farmguider.models.cow.dtos;

import pl.edu.uwm.farmguider.models.cow.Cow;

public class CowMapper {

    public static CowResponseDTO mapToCowResponseDTO(Cow cow) {
        return CowResponseDTO.builder()
                .cowId(cow.getId())
                .cowName(cow.getCowName())
                .earTagNumber(cow.getEarTagNumber())
                .dateOfBirth(cow.getDateOfBirth())
                .gender(cow.getGender().name())
                .currentWeight(cow.getCurrentWeight())
                .latestMilkingQuantity(cow.getLatestMilkingQuantity())
                .latestMilkingDate(cow.getLatestMilkingDate())
                .latestWeightMeasurementDate(cow.getLatestWeightMeasurementDate())
                .build();
    }

}
