package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import pl.edu.uwm.farmguider.models.field.Field;

public interface FieldRepository extends JpaRepository<Field, Long>, JpaSpecificationExecutor<Field> {

    @Query("""
        SELECT f.farm.owner.id
        FROM Field f
        JOIN f.farm.owner
        WHERE f.id = :fieldId
        """)
    Long findUserIdByFieldId(Long fieldId);

}
