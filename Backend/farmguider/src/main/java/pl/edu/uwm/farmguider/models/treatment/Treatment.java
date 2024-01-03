package pl.edu.uwm.farmguider.models.treatment;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.crop.Crop;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "treatments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Treatment extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", referencedColumnName = "id")
    Crop crop;

    String treatmentName;
    LocalDate treatmentDate;
    BigDecimal quantity;
    String details;

}
