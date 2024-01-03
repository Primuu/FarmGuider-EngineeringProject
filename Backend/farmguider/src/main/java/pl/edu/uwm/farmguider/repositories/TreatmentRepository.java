package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.treatment.Treatment;

import java.util.List;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

    List<Treatment> findAllByCropId(Long cropId);

    @Query("""
            SELECT fa.owner.id
            FROM Treatment t
            JOIN t.crop c
            JOIN c.field f
            JOIN f.farm fa
            WHERE t.id = :treatmentId
            """)
    Long findUserIdByTreatmentId(@Param("treatmentId") Long treatmentId);

}
