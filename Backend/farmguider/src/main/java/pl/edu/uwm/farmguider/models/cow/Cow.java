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
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    BigDecimal currentWeight;
    BigDecimal latestMilkingQuantity;
    LocalDateTime latestMilkingDate;
    LocalDate latestWeightMeasurementDate;

    @Enumerated(EnumType.STRING)
    Gender gender;

    @OneToMany(mappedBy = "cow", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Milking> milkings;

    @OneToMany(mappedBy = "cow", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<WeightGain> weightGains;

    public Cow(Breeding breeding, String cowName, String earTagNumber, LocalDate dateOfBirth, Gender gender) {
        this.breeding = breeding;
        this.cowName = cowName;
        this.earTagNumber = earTagNumber;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }

}
