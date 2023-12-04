package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.milking.Milking;

import java.math.BigDecimal;
import java.util.List;

public interface MilkingRepository extends JpaRepository<Milking, Long> {

    @Query("""
            SELECT m.milkQuantity
            FROM Milking m
            WHERE m.cow.id = :cowId
            ORDER BY m.dateOfMilking DESC
            """)
    List<BigDecimal> findLatestMilkingQuantitiesByCowId(@Param("cowId") Long cowId);

}
