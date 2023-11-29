package pl.edu.uwm.farmguider.models.farm;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.user.User;

import java.util.List;

@Entity
@Table(name = "farms")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Farm extends BasicEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    User owner;

    String farmName;

    @OneToMany(mappedBy = "farm", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Breeding> breedings;

    public Farm(User user, String farmName) {
        this.owner = user;
        this.farmName = farmName;
    }

}
