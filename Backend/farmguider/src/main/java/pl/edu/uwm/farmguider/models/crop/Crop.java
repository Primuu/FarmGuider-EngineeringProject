package pl.edu.uwm.farmguider.models.crop;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.models.treatment.Treatment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "crops")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Crop extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id", referencedColumnName = "id")
    Field field;

    @Enumerated(EnumType.STRING)
    CropTypeEnum cropType;

    LocalDate sowingDate;
    LocalDate harvestDate;
    LocalDate expectedHarvestStartDate;
    LocalDate expectedHarvestEndDate;
    BigDecimal yield;
    BigDecimal expectedYield;

    @OneToMany(mappedBy = "crop", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Treatment> treatments;

    public Crop (Field field,
                 CropTypeEnum cropType,
                 LocalDate sowingDate,
                 LocalDate expectedHarvestStartDate,
                 LocalDate expectedHarvestEndDate,
                 BigDecimal expectedYield) {
        this.field = field;
        this.cropType = cropType;
        this.sowingDate = sowingDate;
        this.expectedHarvestStartDate = expectedHarvestStartDate;
        this.expectedHarvestEndDate = expectedHarvestEndDate;
        this.expectedYield = expectedYield;
    }

}
