package pl.edu.uwm.farmguider.models;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ChartValueDTO(LocalDate date,
                            BigDecimal value) {

    @Builder
    public ChartValueDTO {}

}
