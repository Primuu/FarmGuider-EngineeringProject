package pl.edu.uwm.farmguider.models.cow;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;

import java.time.LocalDate;

@Entity
@Table(name = "cows")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cow extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breeding_id", referencedColumnName = "id")
    Breeding breeding;

    String earTagNumber;
    LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    Gender gender;

}
