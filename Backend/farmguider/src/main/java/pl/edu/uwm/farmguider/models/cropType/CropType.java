package pl.edu.uwm.farmguider.models.cropType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;

import java.math.BigDecimal;

@Entity
@Table(name = "crop_types")
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CropType extends BasicEntity {

    @Enumerated(EnumType.STRING)
    CropTypeEnum cropType;

    String optimalPlantingStartDate;
    String optimalPlantingEndDate;
    String optimalHarvestStartDate;
    String optimalHarvestEndDate;
    BigDecimal averageYield;

}
