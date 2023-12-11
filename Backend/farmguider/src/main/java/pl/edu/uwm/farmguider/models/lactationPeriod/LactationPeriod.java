package pl.edu.uwm.farmguider.models.lactationPeriod;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.cow.Cow;

import java.time.LocalDate;

@Entity
@Table(name = "lactation_periods")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LactationPeriod extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cow_id", referencedColumnName = "id")
    Cow cow;

    LocalDate startDate;
    LocalDate endDate;

    public LactationPeriod(Cow cow, LocalDate startDate) {
        this.cow = cow;
        this.startDate = startDate;
    }

}
