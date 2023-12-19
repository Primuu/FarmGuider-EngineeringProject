package pl.edu.uwm.farmguider.models.cropType.enums;

import java.util.Arrays;

public enum CropTypeEnum {
    WHEAT,
    TRITICALE,
    BARLEY,
    RAPESEED,
    RYE,
    OATS,
    CORN,
    POTATO,
    SUGAR_BEET;

    public static boolean isValid(String value) {
        return Arrays.stream(CropTypeEnum.values())
                .anyMatch(cropTypeEnum -> cropTypeEnum.name().equals(value));
    }

}
