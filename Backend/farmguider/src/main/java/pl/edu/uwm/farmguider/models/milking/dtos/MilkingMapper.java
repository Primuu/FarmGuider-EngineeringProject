package pl.edu.uwm.farmguider.models.milking.dtos;

import pl.edu.uwm.farmguider.models.milking.Milking;

public class MilkingMapper {

    public static MilkingResponseDTO mapToMilkingResponseDTO(Milking milking) {
        return MilkingResponseDTO.builder()
                .milkingId(milking.getId())
                .dateOfMilking(milking.getDateOfMilking())
                .milkQuantity(milking.getMilkQuantity())
                .milkingDuration(milking.getMilkingDuration())
                .build();
    }

}
