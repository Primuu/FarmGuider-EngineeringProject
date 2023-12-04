package pl.edu.uwm.farmguider.models.milking;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.cow.Cow;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "milkings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Milking extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cow_id", referencedColumnName = "id")
    Cow cow;

    LocalDateTime dateOfMilking;
    BigDecimal milkQuantity;
    Integer milkingDuration; // seconds

}
