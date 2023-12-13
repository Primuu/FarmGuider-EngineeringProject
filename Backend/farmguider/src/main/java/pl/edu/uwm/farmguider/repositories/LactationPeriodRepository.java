package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;

import java.util.List;

public interface LactationPeriodRepository extends JpaRepository<LactationPeriod, Long> {

    List<LactationPeriod> findAllByCowId(Long cowId);

    @Query("""
            SELECT f.owner.id
            FROM LactationPeriod lp
            JOIN lp.cow c
            JOIN c.breeding b
            JOIN b.farm f
            WHERE lp.id = :lactationPeriodId
            """)
    Long findUserIdByLactationPeriodId(@Param("lactationPeriodId") Long lactationPeriodId);

    @Query("""
            SELECT lp.cow
            FROM LactationPeriod lp
            WHERE lp.id = :lactationPeriodId
            """)
    Cow findCowByLactationPeriodId(@Param("lactationPeriodId") Long lactationPeriodId);

}
