package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.crop.Crop;

import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {

    List<Crop> findAllByFieldId(Long fieldId);

    @Query("""
            SELECT fa.owner.id
            FROM Crop c
            JOIN c.field f
            JOIN f.farm fa
            WHERE c.id = :cropId
            """)
    Long findUserIdByCropId(@Param("cropId") Long cropId);

}
