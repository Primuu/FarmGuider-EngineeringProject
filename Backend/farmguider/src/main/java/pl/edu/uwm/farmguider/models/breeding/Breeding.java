package pl.edu.uwm.farmguider.models.breeding;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.farm.Farm;

import java.util.List;

@Entity
@Table(name = "breedings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Breeding extends BasicEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", referencedColumnName = "id")
    Farm farm;

    String breedingName;

    @OneToMany(mappedBy = "breeding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Cow> cows;

}
