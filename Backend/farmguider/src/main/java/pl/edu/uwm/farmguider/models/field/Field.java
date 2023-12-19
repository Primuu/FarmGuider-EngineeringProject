package pl.edu.uwm.farmguider.models.field;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.models.field.enums.SoilClass;

import java.math.BigDecimal;

@Entity
@Table(name = "fields")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Field extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", referencedColumnName = "id")
    Farm farm;

    String fieldName;
    BigDecimal fieldArea;

    @Enumerated(EnumType.STRING)
    SoilClass soilClass;

    public Field(Farm farm, String fieldName, BigDecimal fieldArea, SoilClass soilClass) {
        this.farm = farm;
        this.fieldName = fieldName;
        this.fieldArea = fieldArea;
        this.soilClass = soilClass;
    }

}
