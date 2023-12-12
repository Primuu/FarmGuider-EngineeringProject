package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;

import java.util.List;

public interface MilkingRepository extends JpaRepository<Milking, Long> {

    List<Milking> findAllByCowId(Long cowId);

    @Query("""
            SELECT f.owner.id
            FROM Milking m
            JOIN m.cow c
            JOIN c.breeding b
            JOIN b.farm f
            WHERE m.id = :milkingId
            """)
    Long findUserIdByMilkingId(@Param("milkingId") Long milkingId);

    @Query("""
            SELECT m.cow
            FROM Milking m
            WHERE m.id = :milkingId
            """)
    Cow findCowByMilkingId(@Param("milkingId") Long milkingId);

}
