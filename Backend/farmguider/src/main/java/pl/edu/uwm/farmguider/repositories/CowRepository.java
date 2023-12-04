package pl.edu.uwm.farmguider.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.uwm.farmguider.models.cow.Cow;

public interface CowRepository extends JpaRepository<Cow, Long> {

    @Query("""
            SELECT f.owner.id
            FROM Cow c
            JOIN c.breeding b
            JOIN b.farm f
            WHERE c.id = :cowId
            """)
    Long findUserIdByCowId(@Param("cowId") Long cowId);

    Page<Cow> findAllByBreedingId(Long breedingId, Pageable pageable);

}
