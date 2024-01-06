package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface MilkingRepository extends JpaRepository<Milking, Long> {

    List<Milking> findAllByCowId(Long cowId);

    List<Milking> findAllByDateOfMilkingBetweenAndCowId(LocalDateTime startDateTime, LocalDateTime endDateTime, Long cowId);

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

    @Query("""
            SELECT SUM(m.milkQuantity)
            FROM Milking m
            WHERE m.cow IN :cows
            AND CAST(m.dateOfMilking AS LOCALDATE ) = :date
            """)
    BigDecimal sumMilkQuantityByCowInAndDate(@Param("cows") Collection<Cow> cows, @Param("date") LocalDate date);

    @Query("""
            SELECT COUNT(DISTINCT m.cow)
            FROM Milking m
            WHERE m.cow IN :cows
            AND m.dateOfMilking >= :startTime
            AND m.dateOfMilking < :endTime
            """)
    Integer countCowsMilkedInPeriod(@Param("cows") Collection<Cow> cows,
                                    @Param("startTime") LocalDateTime startTime,
                                    @Param("endTime") LocalDateTime endTime);

}
