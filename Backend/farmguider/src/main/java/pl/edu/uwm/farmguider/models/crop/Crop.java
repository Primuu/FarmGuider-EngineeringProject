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

import java.math.BigDecimal;
import java.time.LocalDate;

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
    BigDecimal yield;

    public Crop (Field field, CropTypeEnum cropType, LocalDate sowingDate) {
        this.field = field;
        this.cropType = cropType;
        this.sowingDate = sowingDate;
    }

}
