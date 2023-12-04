package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;

import java.math.BigDecimal;
import java.util.List;

public interface WeightGainRepository extends JpaRepository<WeightGain, Long> {

    @Query("""
            SELECT wg.weight
            FROM WeightGain wg
            WHERE wg.cow.id = :cowId
            ORDER BY wg.measurementDate DESC
            """)
    List<BigDecimal> findLatestWeightsByCowId(@Param("cowId") Long cowId);

}
