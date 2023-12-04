package pl.edu.uwm.farmguider.models.weightGain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.cow.Cow;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "weight_gains")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WeightGain extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cow_id", referencedColumnName = "id")
    Cow cow;

    LocalDate measurementDate;
    BigDecimal weight;

}
