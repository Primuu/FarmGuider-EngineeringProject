package pl.edu.uwm.farmguider.models.address;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.edu.uwm.farmguider.models.basic.BasicEntity;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Address extends BasicEntity {

    String locality;
    String street;
    String zipCode;
    String propertyNumber;

}
