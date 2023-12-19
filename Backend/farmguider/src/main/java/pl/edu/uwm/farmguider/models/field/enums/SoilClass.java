package pl.edu.uwm.farmguider.models.field.enums;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum SoilClass {

    I("I"),
    II("II"),
    IIIa("III a"),
    IIIb("III b"),
    IVa("IV a"),
    IVb("IV b"),
    V("V"),
    Unknown("Unknown");

    private final String value;

    SoilClass(String value) {
        this.value = value;
    }

    public static boolean isValid(String value) {
        return Arrays.stream(SoilClass.values())
                .anyMatch(soilClass -> soilClass.name().equals(value));
    }

}
