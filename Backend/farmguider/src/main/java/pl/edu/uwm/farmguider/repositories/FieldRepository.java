package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.edu.uwm.farmguider.models.field.Field;

public interface FieldRepository extends JpaRepository<Field, Long>, JpaSpecificationExecutor<Field> {

}
