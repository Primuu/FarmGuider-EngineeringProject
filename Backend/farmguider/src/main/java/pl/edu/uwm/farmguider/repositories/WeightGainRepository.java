package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;

import java.util.List;

public interface WeightGainRepository extends JpaRepository<WeightGain, Long> {

    List<WeightGain> findAllByCowId(Long cowId);

    @Query("""
            SELECT f.owner.id
            FROM WeightGain wg
            JOIN wg.cow c
            JOIN c.breeding b
            JOIN b.farm f
            WHERE wg.id = :weightGainId
            """)
    Long findUserIdByWeightGainId(Long weightGainId);

    @Query("""
            SELECT wg.cow
            FROM WeightGain wg
            WHERE wg.id = :weightGainId
            """)
    Cow findCowByWeightGainId(Long weightGainId);

}
