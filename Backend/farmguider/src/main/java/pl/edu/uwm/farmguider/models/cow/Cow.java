package pl.edu.uwm.farmguider.models.cow;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cow extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "breeding_id", referencedColumnName = "id")
    Breeding breeding;

    String cowName;
    String earTagNumber;
    LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    Gender gender;

    public Cow(Breeding breeding, String cowName, String earTagNumber, LocalDate dateOfBirth, Gender gender) {
        this.breeding = breeding;
        this.cowName = cowName;
        this.earTagNumber = earTagNumber;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }

}
